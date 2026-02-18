const db = require('../config/db');
const nodemailer = require('nodemailer');

// Ensure tables exist
const ensureOrderTables = async () => {
  // Orders table
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      shipping_address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20),
      payment_method VARCHAR(50) NOT NULL,
      payment_status VARCHAR(50) DEFAULT 'pending',
      order_status VARCHAR(50) DEFAULT 'processing',
      total_amount NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Order items table
  await db.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      hardware_id INTEGER REFERENCES hardware(id) ON DELETE SET NULL,
      hardware_name VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Payments table
  await db.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      payment_gateway VARCHAR(50) NOT NULL,
      transaction_id VARCHAR(255),
      amount NUMERIC(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      gateway_response JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Create new order
exports.createOrder = async (req, res) => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    city,
    postalCode,
    paymentMethod,
    totalAmount,
    items
  } = req.body;

  if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !paymentMethod || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const client = await db.connect();

  try {
    await ensureOrderTables();
    await client.query('BEGIN');

    // Insert order
    const orderResult = await client.query(
      `INSERT INTO orders (
        user_id, customer_name, customer_email, customer_phone,
        shipping_address, city, postal_code, payment_method, total_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      [userId, customerName, customerEmail, customerPhone, shippingAddress, city, postalCode, paymentMethod, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (
          order_id, hardware_id, hardware_name, quantity, price
        ) VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.hardwareId, item.hardwareName, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    // Send email notification to admin
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Build items table HTML
      const itemsTableRows = items.map(item => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${item.hardwareName}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      const mailOptions = {
        from: `"BloomSwift POS System" <${process.env.SMTP_USER}>`,
        to: 'info@bloomtech.lk',
        subject: `New Order #${orderId} - ${customerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #002044; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">New Order Received</h1>
              <p style="margin: 5px 0 0 0; font-size: 18px;">Order #${orderId}</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <!-- Order Summary -->
              <div style="background-color: #e8f4ff; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #0055D4;">
                <h2 style="color: #002044; margin: 0 0 10px 0; font-size: 18px;">Order Summary</h2>
                <p style="margin: 5px 0; color: #333;"><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0; color: #333;"><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p style="margin: 5px 0; color: #333;"><strong>Status:</strong> <span style="color: #ff9800; font-weight: bold;">Processing</span></p>
              </div>

              <!-- Customer Information -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #002044; border-bottom: 2px solid #0055D4; padding-bottom: 10px; font-size: 18px;">Customer Information</h2>
                <table style="width: 100%; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px 0; width: 30%; color: #666;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${customerEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${customerPhone}</td>
                  </tr>
                </table>
              </div>

              <!-- Shipping Address -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #002044; border-bottom: 2px solid #0055D4; padding-bottom: 10px; font-size: 18px;">Shipping Address</h2>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <p style="margin: 5px 0; color: #333;">${shippingAddress}</p>
                  <p style="margin: 5px 0; color: #333;">${city}${postalCode ? ', ' + postalCode : ''}</p>
                </div>
              </div>

              <!-- Order Items -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #002044; border-bottom: 2px solid #0055D4; padding-bottom: 10px; font-size: 18px;">Order Items</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background-color: #f9f9f9; border-radius: 8px; overflow: hidden;">
                  <thead>
                    <tr style="background-color: #002044; color: white;">
                      <th style="padding: 12px; text-align: left;">Product</th>
                      <th style="padding: 12px; text-align: center;">Quantity</th>
                      <th style="padding: 12px; text-align: right;">Price</th>
                      <th style="padding: 12px; text-align: right;">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsTableRows}
                  </tbody>
                </table>
              </div>

              <!-- Total -->
              <div style="background-color: #002044; color: white; padding: 20px; border-radius: 8px; text-align: right;">
                <p style="margin: 0; font-size: 24px; font-weight: bold;">Total: $${parseFloat(totalAmount).toFixed(2)}</p>
              </div>

              <!-- Footer -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 10px 0;">This is an automated notification from BloomSwift POS System</p>
                <p style="color: #999; font-size: 12px; margin: 5px 0;">Order ID: ${orderId} | ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Order notification email sent for Order #${orderId}`);
    } catch (emailErr) {
      console.error('Error sending order notification email:', emailErr);
      // Continue execution, don't fail the request just because email failed
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureOrderTables();

    // Get order details
    const orderResult = await db.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // Get order items
    const itemsResult = await db.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    );

    order.items = itemsResult.rows;

    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    await ensureOrderTables();

    const ordersResult = await db.query(
      `SELECT o.*, 
        (SELECT json_agg(oi.*) FROM order_items oi WHERE oi.order_id = o.id) as items
       FROM orders o
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      orders: ordersResult.rows
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    await ensureOrderTables();

    const ordersResult = await db.query(
      `SELECT o.*, 
        (SELECT json_agg(oi.*) FROM order_items oi WHERE oi.order_id = o.id) as items
       FROM orders o
       ORDER BY o.created_at DESC`
    );

    return res.status(200).json({
      success: true,
      orders: ordersResult.rows
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  try {
    await ensureOrderTables();

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (orderStatus) {
      updateFields.push(`order_status = $${paramCount++}`);
      values.push(orderStatus);
    }

    if (paymentStatus) {
      updateFields.push(`payment_status = $${paramCount++}`);
      values.push(paymentStatus);
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const query = `UPDATE orders SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
};

// Process Stripe payment
exports.processStripePayment = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureOrderTables();

    // Get order
    const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // TODO: Integrate with Stripe API
    // For now, create a mock client secret
    const clientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;

    // Create payment record
    await db.query(
      `INSERT INTO payments (order_id, payment_gateway, amount, status)
       VALUES ($1, $2, $3, $4)`,
      [id, 'stripe', order.total_amount, 'pending']
    );

    return res.status(200).json({
      success: true,
      clientSecret,
      message: 'Stripe payment initialized'
    });
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    });
  }
};

// Process PayPal payment
exports.processPayPalPayment = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureOrderTables();

    // Get order
    const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // TODO: Integrate with PayPal API
    // For now, create a mock approval URL
    const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=mock_${Date.now()}`;

    // Create payment record
    await db.query(
      `INSERT INTO payments (order_id, payment_gateway, amount, status)
       VALUES ($1, $2, $3, $4)`,
      [id, 'paypal', order.total_amount, 'pending']
    );

    return res.status(200).json({
      success: true,
      approvalUrl,
      message: 'PayPal payment initialized'
    });
  } catch (error) {
    console.error('Error processing PayPal payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    });
  }
};

// Process PayHere payment
exports.processPayHerePayment = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureOrderTables();

    // Get order
    const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderResult.rows[0];

    // TODO: Integrate with PayHere API
    // For now, create mock payment data
    const paymentData = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID || 'mock_merchant',
      return_url: `${process.env.FRONTEND_URL}/order-confirmation/${id}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      notify_url: `${process.env.API_URL}/api/orders/${id}/payment/payhere/notify`,
      order_id: id,
      items: `Order #${id}`,
      currency: 'LKR',
      amount: order.total_amount
    };

    // Create payment record
    await db.query(
      `INSERT INTO payments (order_id, payment_gateway, amount, status)
       VALUES ($1, $2, $3, $4)`,
      [id, 'payhere', order.total_amount, 'pending']
    );

    return res.status(200).json({
      success: true,
      payment: paymentData,
      message: 'PayHere payment initialized'
    });
  } catch (error) {
    console.error('Error processing PayHere payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    });
  }
};
