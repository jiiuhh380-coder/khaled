// ============================================
// قاعدة البيانات المحلية (LocalStorage)
// ============================================
const DB = {
    // تهيئة قاعدة البيانات
    init() {
        if (!localStorage.getItem('mostamer_initialized')) {
            this.initUsers();
            this.initProducts();
            this.initSales();
            this.initExpenses();
            this.initSettings();
            this.initMaintenance();
            this.initPurchases();
            this.initSuppliers();
            localStorage.setItem('mostamer_initialized', 'true');
        }
    },

    // المستخدمين
    initUsers() {
        const users = [
            { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'المدير' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    },

    get users() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    saveUser(user) {
        const users = this.users;
        if (user.id) {
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) users[index] = user;
        } else {
            user.id = Date.now();
            users.push(user);
        }
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    },

    deleteUser(id) {
        const users = this.users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
    },

    // المنتجات
    initProducts() {
        const products = [
            { id: 1, name: 'iPhone 15 Pro', brand: 'Apple', model: 'A1234', category: 'موبايلات', cost_price: 3500, selling_price: 4200, quantity: 10, min_stock: 5, barcode: '1234567890123', condition: 'جديد' },
            { id: 2, name: 'Samsung S24', brand: 'Samsung', model: 'S24', category: 'موبايلات', cost_price: 3000, selling_price: 3800, quantity: 8, min_stock: 5, barcode: '1234567890124', condition: 'جديد' },
            { id: 3, name: 'شاحن سريع', brand: 'Generic', model: 'QC3.0', category: 'ملحقات', cost_price: 50, selling_price: 100, quantity: 20, min_stock: 10, barcode: '1234567890125', condition: '-' }
        ];
        localStorage.setItem('products', JSON.stringify(products));
    },

    get products() {
        return JSON.parse(localStorage.getItem('products') || '[]');
    },

    saveProduct(product) {
        const products = this.products;
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) products[index] = product;
        } else {
            product.id = Date.now();
            products.push(product);
        }
        localStorage.setItem('products', JSON.stringify(products));
        return product;
    },

    deleteProduct(id) {
        const products = this.products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
    },

    // المبيعات
    initSales() {
        localStorage.setItem('sales', JSON.stringify([]));
    },

    get sales() {
        return JSON.parse(localStorage.getItem('sales') || '[]');
    },

    saveSale(sale) {
        const sales = this.sales;
        const index = sales.findIndex(s => s.id === sale.id);
        if (index !== -1) {
            sales[index] = sale;
            localStorage.setItem('sales', JSON.stringify(sales));
            return sale;
        }
        sale.id = Date.now();
        sale.invoice_number = this.generateInvoiceNumber();
        sale.sale_date = new Date().toISOString().split('T')[0];
        sale.sale_time = new Date().toLocaleTimeString('ar-SA');
        sales.push(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
        return sale;
    },

    updateSale(sale) {
        const sales = this.sales;
        const index = sales.findIndex(s => s.id === sale.id);
        if (index !== -1) {
            sales[index] = sale;
            localStorage.setItem('sales', JSON.stringify(sales));
            return sale;
        }
        return null;
    },

    generateInvoiceNumber() {
        const prefix = 'INV';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    },

    deleteSale(id) {
        const sales = this.sales.filter(s => s.id !== id);
        localStorage.setItem('sales', JSON.stringify(sales));
    },

    clearSales() {
        localStorage.setItem('sales', JSON.stringify([]));
    },

    // المصاريف
    initExpenses() {
        localStorage.setItem('expenses', JSON.stringify([]));
    },

    get expenses() {
        return JSON.parse(localStorage.getItem('expenses') || '[]');
    },

    saveExpense(expense) {
        const expenses = this.expenses;
        expense.id = Date.now();
        expense.date = new Date().toISOString().split('T')[0];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        return expense;
    },

    deleteExpense(id) {
        const expenses = this.expenses.filter(e => e.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    },

    // الإعدادات
    initSettings() {
        const settings = {
            companyName: 'المستمر للمحاسبة',
            currency: 'د.أ',
            language: 'ar',
            theme: 'dark'
        };
        localStorage.setItem('settings', JSON.stringify(settings));
    },

    get settings() {
        return JSON.parse(localStorage.getItem('settings') || '{}');
    },

    saveSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    },

    // الصيانة
    initMaintenance() {
        localStorage.setItem('maintenance', JSON.stringify([]));
    },

    get maintenance() {
        return JSON.parse(localStorage.getItem('maintenance') || '[]');
    },

    saveMaintenance(item) {
        const items = this.maintenance;
        if (item.id) {
            const index = items.findIndex(i => i.id === item.id);
            if (index !== -1) items[index] = item;
        } else {
            item.id = Date.now();
            item.received_date = new Date().toISOString().split('T')[0];
            item.received_time = new Date().toTimeString().slice(0, 5);
            item.status = item.status || 'قيد الإصلاح';
            items.push(item);
        }
        localStorage.setItem('maintenance', JSON.stringify(items));
        return item;
    },

    deleteMaintenance(id) {
        const items = this.maintenance.filter(i => i.id !== id);
        localStorage.setItem('maintenance', JSON.stringify(items));
    },

    clearMaintenance() {
        localStorage.setItem('maintenance', JSON.stringify([]));
    },

    // المشتريات
    initPurchases() {
        localStorage.setItem('purchases', JSON.stringify([]));
    },

    get purchases() {
        return JSON.parse(localStorage.getItem('purchases') || '[]');
    },

    savePurchase(purchase) {
        const purchases = this.purchases;
        if (purchase.id) {
            const index = purchases.findIndex(p => p.id === purchase.id);
            if (index !== -1) purchases[index] = purchase;
        } else {
            purchase.id = Date.now();
            purchase.invoice_number = this.generatePurchaseInvoiceNumber();
            purchase.purchase_date = new Date().toISOString().split('T')[0];
            purchases.push(purchase);
        }
        localStorage.setItem('purchases', JSON.stringify(purchases));
        return purchase;
    },

    deletePurchase(id) {
        const purchases = this.purchases.filter(p => p.id !== id);
        localStorage.setItem('purchases', JSON.stringify(purchases));
    },

    clearPurchases() {
        localStorage.setItem('purchases', JSON.stringify([]));
    },

    generatePurchaseInvoiceNumber() {
        const prefix = 'PUR';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    },

    // الموردين
    initSuppliers() {
        localStorage.setItem('suppliers', JSON.stringify([]));
    },

    get suppliers() {
        return JSON.parse(localStorage.getItem('suppliers') || '[]');
    },

    saveSupplier(supplier) {
        const suppliers = this.suppliers;
        if (supplier.id) {
            const index = suppliers.findIndex(s => s.id === supplier.id);
            if (index !== -1) suppliers[index] = supplier;
        } else {
            supplier.id = Date.now();
            suppliers.push(supplier);
        }
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        return supplier;
    },

    deleteSupplier(id) {
        const suppliers = this.suppliers.filter(s => s.id !== id);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
    }
};

// ============================================
// إدارة الجلسة
// ============================================
const Auth = {
    currentUser: null,

    login(username, password) {
        const user = DB.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    },

    checkSession() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user !== null) {
            this.currentUser = user;
            return true;
        }
        return false;
    }
};

// ============================================
// دوال مساعدة
// ============================================
function toast(msg, type = 'success') {
    const t = document.getElementById('toast');
    const el = document.createElement('div');
    el.className = 'ti ' + type;
    el.textContent = (type === 'success' ? '✅ ' : '❌ ') + msg;
    t.appendChild(el);
    setTimeout(() => el.remove(), 3500);
}

function fmt(n) {
    const v = Number(n || 0);
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'م';
    if (v >= 1000) return v.toLocaleString('ar');
    return v.toLocaleString('ar');
}

function ld() {
    return '<div class="spin"></div>';
}

function em(m = 'لا توجد بيانات') {
    return `<div class="empty"><div class="ei">📭</div><p>${m}</p></div>`;
}

// ============================================
// إدارة النافذة المنبثقة
// ============================================
function omo(title, body, foot = '<button class="btn btn-ghost" onclick="cmo()">إغلاق</button>') {
    document.getElementById('mtitle').textContent = title;
    document.getElementById('mbody').innerHTML = body;
    document.getElementById('mfoot').innerHTML = foot;
    document.getElementById('ov').classList.add('open');
}

function cmo(e) {
    if (!e || e.target === document.getElementById('ov')) {
        document.getElementById('ov').classList.remove('open');
    }
}

// ============================================
// دوال مساعدة للمشتريات
// ============================================
function getDatesForPeriod(period) {
  const now = new Date();
  if (period === 'اليوم') {
    return [now.toISOString().split('T')[0], now.toISOString().split('T')[0]];
  } else if (period === 'أسبوع') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return [weekAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]];
  } else if (period === 'شهر') {
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
    return [monthAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]];
  } else if (period === 'سنة') {
    const yearAgo = new Date(now.getFullYear(), 0, 1);
    return [yearAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]];
  }
  return ['', ''];
}

// ============================================
// دالة API المحلية للتعامل مع LocalStorage
// ============================================
async function api(path, method = 'GET', body = null) {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
        // التعامل مع الصيانة
        if (path.includes('/api/maintenance')) {
            if (path === '/api/maintenance/clear' && method === 'POST') {
                DB.clearMaintenance();
                return { success: true, message: 'تم حذف جميع طلبات الصيانة' };
            }
            if (path === '/api/maintenance/add' && method === 'POST') {
                const item = DB.saveMaintenance(body);
                return { success: true, message: 'تم إضافة طلب الصيانة', data: item };
            }
            if (path.includes('/api/maintenance/') && method === 'PUT') {
                const id = parseInt(path.split('/').pop());
                const item = DB.maintenance.find(i => i.id === id);
                if (item) {
                    Object.assign(item, body);
                    DB.saveMaintenance(item);
                    return { success: true, message: 'تم تحديث طلب الصيانة', data: item };
                }
                return { success: false, message: 'طلب الصيانة غير موجود' };
            }
            if (path.includes('/api/maintenance/') && method === 'DELETE') {
                const id = parseInt(path.split('/').pop());
                DB.deleteMaintenance(id);
                return { success: true, message: 'تم حذف طلب الصيانة' };
            }
            if (path === '/api/maintenance') {
                let data = DB.maintenance;
                const urlParams = new URLSearchParams(path.split('?')[1]);
                const status = urlParams.get('status');
                if (status) {
                    data = data.filter(m => m.status === status);
                }
                return { success: true, data: data };
            }
        }

        // التعامل مع أسعار الصرف
        if (path === '/api/currency/rates') {
            if (method === 'POST') {
                rates = { ...rates, ...body };
                localStorage.setItem('rates', JSON.stringify(rates));
                return { success: true, message: 'تم حفظ أسعار الصرف' };
            }
            return { success: true, data: rates };
        }

        // التعامل مع المشتريات
        if (path.includes('/api/purchases')) {
            if (path === '/api/purchases/clear' && method === 'POST') {
                DB.clearPurchases();
                return { success: true, message: 'تم حذف جميع المشتريات' };
            }
            if (path === '/api/purchases/add' && method === 'POST') {
                const purchase = {
                    supplier_id: body.supplier_id,
                    supplier_name: body.supplier_id ? DB.suppliers.find(s => s.id === body.supplier_id)?.name || '' : '',
                    paid_amount: parseFloat(body.paid_amount) || 0,
                    items: body.items || [],
                    total_amount: body.items?.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0) || 0
                };
                purchase.remaining_amount = purchase.total_amount - purchase.paid_amount;
                const saved = DB.savePurchase(purchase);
                // تحديث مخزون المنتجات
                body.items?.forEach(item => {
                    const product = DB.products.find(p => p.id === item.product_id);
                    if (product) {
                        product.quantity += item.quantity;
                        product.cost_price = item.unit_price;
                        product.selling_price = item.sell_price || product.selling_price;
                        DB.saveProduct(product);
                    }
                });
                return { success: true, message: 'تم إضافة فاتورة الشراء', data: saved };
            }
            if (path.includes('/api/purchases/') && method === 'PUT') {
                const id = parseInt(path.split('/').pop());
                const purchase = DB.purchases.find(p => p.id === id);
                if (purchase) {
                    const amount = parseFloat(body.amount) || 0;
                    purchase.paid_amount += amount;
                    purchase.remaining_amount = Math.max(0, purchase.total_amount - purchase.paid_amount);
                    DB.savePurchase(purchase);
                    return { success: true, message: 'تم تحديث فاتورة الشراء', data: purchase };
                }
                return { success: false, message: 'فاتورة الشراء غير موجودة' };
            }
            if (path.includes('/api/purchases/') && method === 'DELETE') {
                const id = parseInt(path.split('/').pop());
                DB.deletePurchase(id);
                return { success: true, message: 'تم حذف فاتورة الشراء' };
            }
            if (path === '/api/purchases') {
                const urlParams = new URLSearchParams(path.split('?')[1]);
                const period = urlParams.get('period') || 'شهر';
                let data = DB.purchases;
                const now = new Date();
                if (period === 'اليوم') {
                    data = data.filter(p => p.purchase_date === now.toISOString().split('T')[0]);
                } else if (period === 'أسبوع') {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    data = data.filter(p => new Date(p.purchase_date) >= weekAgo);
                } else if (period === 'شهر') {
                    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
                    data = data.filter(p => new Date(p.purchase_date) >= monthAgo);
                } else if (period === 'سنة') {
                    const yearAgo = new Date(now.getFullYear(), 0, 1);
                    data = data.filter(p => new Date(p.purchase_date) >= yearAgo);
                }
                return { success: true, data: data };
            }
            if (path.includes('/api/purchases/') && path.includes('/pay') && method === 'POST') {
                const id = parseInt(path.split('/')[3]);
                const purchase = DB.purchases.find(p => p.id === id);
                if (purchase) {
                    const amount = parseFloat(body.amount) || 0;
                    purchase.paid_amount += amount;
                    purchase.remaining_amount = Math.max(0, purchase.total_amount - purchase.paid_amount);
                    DB.savePurchase(purchase);
                    return { success: true, message: 'تم تسجيل الدفعة', data: purchase };
                }
                return { success: false, message: 'فاتورة الشراء غير موجودة' };
            }
        }

        // التعامل مع الموردين
        if (path.includes('/api/suppliers')) {
            if (path === '/api/suppliers/add' && method === 'POST') {
                const supplier = DB.saveSupplier(body);
                return { success: true, message: 'تم إضافة المورد', data: supplier };
            }
            if (path.includes('/api/suppliers/') && method === 'PUT') {
                const id = parseInt(path.split('/').pop());
                const supplier = DB.suppliers.find(s => s.id === id);
                if (supplier) {
                    Object.assign(supplier, body);
                    DB.saveSupplier(supplier);
                    return { success: true, message: 'تم تحديث المورد', data: supplier };
                }
                return { success: false, message: 'المورد غير موجود' };
            }
            if (path.includes('/api/suppliers/') && method === 'DELETE') {
                const id = parseInt(path.split('/').pop());
                DB.deleteSupplier(id);
                return { success: true, message: 'تم حذف المورد' };
            }
            if (path === '/api/suppliers') {
                return { success: true, data: DB.suppliers };
            }
        }

        return { success: false, message: 'المسار غير مدعوم' };
    } catch (e) {
        console.error('API Error:', e);
        return { success: false, message: 'خطأ: ' + e.message };
    }
}

// ============================================
// تسجيل الدخول
// ============================================
function doLogin() {
    const btn = document.getElementById('login-btn');
    const un = document.getElementById('lu').value.trim();
    const pw = document.getElementById('lp').value.trim();

    document.getElementById('lerr').style.display = 'none';
    document.getElementById('lok').style.display = 'none';

    if (!un || !pw) {
        showErr('أدخل اسم المستخدم وكلمة المرور');
        return;
    }

    btn.disabled = true;
    btn.textContent = '⏳ جاري الدخول...';

    if (Auth.login(un, pw)) {
        document.getElementById('lok').style.display = 'block';
        document.getElementById('lok').textContent = '✅ تم تسجيل الدخول بنجاح';
        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app').style.display = 'flex';
            document.getElementById('u-name').textContent = Auth.currentUser.name;
            document.getElementById('sb-user').textContent = 'مرحباً، ' + Auth.currentUser.name;
            go('dashboard');
        }, 1000);
    } else {
        showErr('بيانات الدخول غير صحيحة');
    }

    btn.disabled = false;
    btn.innerHTML = '🔑 تسجيل الدخول';
}

function showErr(msg) {
    const el = document.getElementById('lerr');
    el.textContent = '❌ ' + msg;
    el.style.display = 'block';
}

function doLogout() {
    Auth.logout();
    location.reload();
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sb-overlay');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// ============================================
// التنقل
// ============================================
const TITLES = {
    dashboard: 'لوحة التحكم',
    products: 'المنتجات',
    sales: 'المبيعات',
    purchases: 'المشتريات',
    pos: 'نقطة البيع',
    suppliers: 'الموردين',
    customers: 'العملاء',
    expenses: 'المصاريف',
    maintenance: 'الصيانة',
    reports: 'التقارير',
    currency: 'حاسبة العملات',
    barcode_sale: 'بيع بالباركود',
    barcode_return: 'استرجاع بالباركود',
    count: 'الجرد',
    mobile: 'إدارة الموبايلات',
    users: 'إدارة المستخدمين',
    license: 'معلومات الترخيص',
    settings: 'الإعدادات',
    inventory: 'المخزون'
};

function go(name) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-p="${name}"]`)?.classList.add('active');
    document.getElementById('page-title').textContent = TITLES[name] || name;

    const fns = {
        dashboard,
        products,
        sales,
        purchases,
        pos,
        suppliers,
        customers,
        expenses,
        maintenance,
        reports,
        currency,
        barcode_sale,
        barcode_return,
        count,
        mobile,
        users,
        license,
        settings,
        inventory
    };

    if (fns[name]) fns[name]();
    else document.getElementById('pc').innerHTML = `<div class="tw"><div class="th"><h3>${name}</h3></div><div style="padding:20px">✅ قسم ${TITLES[name] || name} - جاهز للاستخدام</div></div>`;
}

// ============================================
// لوحة التحكم
// ============================================
function dashboard() {
    const c = document.getElementById('pc');
    const sales = DB.sales;
    const products = DB.products;
    const expenses = DB.expenses;

    // حساب الإحصائيات
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(s => s.sale_date === today);
    const monthSales = sales.filter(s => {
        const saleDate = new Date(s.sale_date);
        const now = new Date();
        return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
    });

    const todayTotal = todaySales.reduce((sum, s) => sum + s.total_amount, 0);
    const monthTotal = monthSales.reduce((sum, s) => sum + s.total_amount, 0);
    const monthProfit = monthSales.reduce((sum, s) => sum + (s.profit || 0), 0);
    const yearProfit = sales.reduce((sum, s) => sum + (s.profit || 0), 0);
    const totalProfit = sales.reduce((sum, s) => sum + (s.profit || 0), 0);

    const monthExpenses = expenses.filter(e => {
        const expDate = new Date(e.date);
        const now = new Date();
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    }).reduce((sum, e) => sum + e.amount, 0);

    const inventoryValue = products.reduce((sum, p) => sum + (p.cost_price * p.quantity), 0);
    const lowStock = products.filter(p => p.quantity <= p.min_stock).length;
    const outStock = products.filter(p => p.quantity <= 0).length;
    const receivables = sales.filter(s => s.remaining_amount > 0).reduce((sum, s) => sum + s.remaining_amount, 0);

    c.innerHTML = `
    <div class="sg">
        <div class="sc bl"><div class="lb">💵 مبيعات اليوم</div><div class="vl">${fmt(todayTotal)}</div><div class="sb">${todaySales.length} فاتورة</div></div>
        <div class="sc bl"><div class="lb">📈 مبيعات الشهر</div><div class="vl">${fmt(monthTotal)}</div><div class="sb">${monthSales.length} فاتورة</div></div>
        <div class="sc gr"><div class="lb">💹 ربح الشهر</div><div class="vl">${fmt(monthProfit)}</div><div class="sb">سنوي: ${fmt(yearProfit)}</div></div>
        <div class="sc gr"><div class="lb">💼 إجمالي الأرباح</div><div class="vl">${fmt(totalProfit)}</div></div>
        <div class="sc wn"><div class="lb">🛍️ مصروفات الشهر</div><div class="vl">${fmt(monthExpenses)}</div></div>
        <div class="sc pu"><div class="lb">📦 قيمة المخزون</div><div class="vl">${fmt(inventoryValue)}</div><div class="sb">${products.length} منتج</div></div>
        <div class="sc rd"><div class="lb">📥 ديون العملاء</div><div class="vl">${fmt(receivables)}</div></div>
        <div class="sc wn"><div class="lb">⚠️ مخزون منخفض</div><div class="vl">${lowStock}</div><div class="sb">نافذ: ${outStock}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
        <div class="tw"><div class="th"><h3>🏆 أعلى المنتجات</h3></div><div id="tp-list">${ld()}</div></div>
        <div class="tw"><div class="th"><h3>⚠️ مخزون منخفض</h3></div><div id="ls-list">${ld()}</div></div>
    </div>`;

    // أعلى المنتجات
    const productSales = {};
    sales.forEach(sale => {
        sale.items.forEach(item => {
            if (!productSales[item.product_id]) {
                productSales[item.product_id] = { qty: 0, revenue: 0 };
            }
            productSales[item.product_id].qty += item.quantity;
            productSales[item.product_id].revenue += item.quantity * item.unit_price;
        });
    });

    const topProducts = Object.entries(productSales)
        .map(([productId, data]) => {
            const product = products.find(p => p.id == productId);
            return { name: product?.name || 'غير معروف', ...data };
        })
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5);

    document.getElementById('tp-list').innerHTML = topProducts.length
        ? `<table><tr><th>المنتج</th><th>الكمية</th><th>الإيراد</th></tr>${topProducts.map(p => `<tr><td>${p.name}</td><td>${fmt(p.qty)}</td><td>${fmt(p.revenue)}</td></tr>`).join('')}</table>`
        : em();

    // مخزون منخفض
    const lowStockProducts = products.filter(p => p.quantity <= p.min_stock);
    document.getElementById('ls-list').innerHTML = lowStockProducts.length
        ? `<table><tr><th>المنتج</th><th>الكمية</th><th>الحد</th></tr>${lowStockProducts.slice(0, 5).map(p => `<tr><td>${p.name}</td><td><span class="badge ${p.quantity <= 0 ? 'br' : 'bw'}">${p.quantity}</span></td><td>${p.min_stock}</td></tr>`).join('')}</table>`
        : em('المخزون كافٍ ✅');
}

// ============================================
// المنتجات
// ============================================
function products(q = '') {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="sb-bar"><input class="si" id="ps" placeholder="🔍 بحث..." value="${q}" oninput="products(this.value)"><button class="btn btn-success" onclick="addProd()">+ إضافة منتج</button></div>
    <div class="tw"><div class="th"><h3>📦 المنتجات</h3><span id="pcnt" style="color:var(--muted);font-size:13px"></span></div><div id="pt">${ld()}</div></div>`;

    const allProducts = DB.products;
    const filtered = q ? allProducts.filter(p => 
        p.name.includes(q) || 
        p.brand.includes(q) || 
        p.barcode?.includes(q)
    ) : allProducts;

    document.getElementById('pcnt').textContent = filtered.length + ' منتج';
    document.getElementById('pt').innerHTML = filtered.length
        ? `<table><tr><th>الاسم</th><th>الماركة</th><th>الفئة</th><th>شراء</th><th>بيع</th><th>الكمية</th><th>الحالة</th><th></th></tr>
        ${filtered.map(p => `<tr><td><b>${p.name}</b></td><td>${p.brand}</td><td>${p.category}</td><td>${fmt(p.cost_price)}</td><td>${fmt(p.selling_price)}</td>
        <td><span class="badge ${p.quantity <= 0 ? 'br' : p.quantity <= p.min_stock ? 'bw' : 'bg'}">${p.quantity}</span></td>
        <td>${p.condition}</td>
        <td style="white-space:nowrap"><button class="btn btn-ghost btn-sm" onclick='eProd(${JSON.stringify(p)})'>✏️</button> <button class="btn btn-danger btn-sm" onclick="dProd(${p.id},'${p.name.replace(/'/g, '')}')">🗑️</button></td></tr>`).join('')}</table>`
        : em();
}

function addProd() {
    omo('➕ إضافة منتج جديد', `<div class="fg">
        <div class="ff full"><label>الاسم *</label><input id="pn" placeholder="iPhone 15 Pro"></div>
        <div class="ff"><label>الماركة *</label><input id="pb" placeholder="Apple"></div>
        <div class="ff"><label>الموديل</label><input id="pm" placeholder="A1234"></div>
        <div class="ff"><label>الفئة</label><select id="pcat" onchange="toggleCondField()"><option>موبايلات</option><option>ملحقات</option><option>أجهزة لوحية</option><option>أخرى</option></select></div>
        <div class="ff"><label>سعر الشراء *</label><input id="pcp" type="number" placeholder="0"></div>
        <div class="ff"><label>سعر البيع *</label><input id="psp" type="number" placeholder="0"></div>
        <div class="ff"><label>الكمية *</label><input id="pq" type="number" placeholder="0"></div>
        <div class="ff"><label>الحد الأدنى</label><input id="pms" type="number" placeholder="5"></div>
        <div class="ff"><label>الباركود</label><input id="pbar" placeholder="اختياري"></div>
        <div class="ff" id="cond-field"><label>الحالة</label><select id="pcon"><option>جديد</option><option>مستعمل</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="svProd()">💾 حفظ</button>`);
    setTimeout(toggleCondField, 50);
}

function toggleCondField() {
    const cat = document.getElementById('pcat')?.value;
    const cf = document.getElementById('cond-field');
    if (cf) cf.style.display = cat === 'موبايلات' ? 'flex' : 'none';
}

function svProd() {
    const product = {
        name: document.getElementById('pn').value,
        brand: document.getElementById('pb').value,
        model: document.getElementById('pm').value || '-',
        category: document.getElementById('pcat').value,
        cost_price: parseFloat(document.getElementById('pcp').value) || 0,
        selling_price: parseFloat(document.getElementById('psp').value) || 0,
        quantity: parseInt(document.getElementById('pq').value) || 0,
        min_stock: parseInt(document.getElementById('pms').value) || 5,
        barcode: document.getElementById('pbar').value || null,
        condition: document.getElementById('pcon').value
    };

    if (!product.name || !product.brand) {
        toast('يرجى ملء الحقول المطلوبة', 'error');
        return;
    }

    DB.saveProduct(product);
    cmo();
    toast('تم حفظ المنتج بنجاح');
    products();
}

function eProd(p) {
    omo('✏️ تعديل المنتج', `<div class="fg">
        <div class="ff full"><label>الاسم</label><input id="en" value="${p.name}"></div>
        <div class="ff"><label>الماركة</label><input id="eb" value="${p.brand}"></div>
        <div class="ff"><label>سعر الشراء</label><input id="ec" type="number" value="${p.cost_price}"></div>
        <div class="ff"><label>سعر البيع</label><input id="es" type="number" value="${p.selling_price}"></div>
        <div class="ff"><label>الكمية</label><input id="eq" type="number" value="${p.quantity}"></div>
        <div class="ff"><label>الحد الأدنى</label><input id="em" type="number" value="${p.min_stock}"></div>
        <div class="ff"><label>الحالة</label><select id="eco"><option ${p.condition === 'جديد' ? 'selected' : ''}>جديد</option><option ${p.condition === 'مستعمل' ? 'selected' : ''}>مستعمل</option><option ${p.condition === 'مجدد' ? 'selected' : ''}>مجدد</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="upProd(${p.id})">💾 حفظ</button>`);
}

function upProd(id) {
    const product = {
        id,
        name: document.getElementById('en').value,
        brand: document.getElementById('eb').value,
        model: '-',
        cost_price: parseFloat(document.getElementById('ec').value) || 0,
        selling_price: parseFloat(document.getElementById('es').value) || 0,
        quantity: parseInt(document.getElementById('eq').value) || 0,
        min_stock: parseInt(document.getElementById('em').value) || 5,
        condition: document.getElementById('eco').value
    };

    DB.saveProduct(product);
    cmo();
    toast('تم تحديث المنتج بنجاح');
    products();
}

function dProd(id, name) {
    if (!confirm(`حذف: ${name}?`)) return;
    DB.deleteProduct(id);
    toast('تم حذف المنتج');
    products();
}

// ============================================
// نقطة البيع
// ============================================
let cart = [];

function pos() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="pos-g">
      <div>
        <div class="sb-bar"><input class="si" id="pos-s" placeholder="🔍 اسم المنتج أو الباركود..." oninput="psrch(this.value)"></div>
        <div id="pos-prods" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px">${ld()}</div>
      </div>
      <div>
        <div class="tw" style="padding:14px">
          <h3 style="margin-bottom:11px">🛒 السلة</h3>
          <div id="cart-items"></div>
          <div class="ri">
            <div style="display:flex;justify-content:space-between;margin-bottom:9px"><span style="color:var(--muted)">الإجمالي</span><b id="ct" style="font-size:19px;color:var(--accent)">0</b></div>
            <div class="ff" style="margin-bottom:9px"><label>المدفوع</label><input id="cp2" type="number" class="rin" placeholder="0" oninput="updRem()"></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:9px"><span style="color:var(--muted)">الباقي</span><b id="cr" style="color:var(--warn)">0</b></div>
            <div class="ff" style="margin-bottom:11px"><label>طريقة الدفع</label><select id="cm" class="rb"><option>نقدي</option><option>بطاقة</option><option>تحويل</option></select></div>
            <button class="btn btn-success" style="width:100%" onclick="doSale()">✅ إتمام البيع</button>
            <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:7px" onclick="cart=[];renderCart()">🗑️ مسح</button>
          </div>
        </div>
      </div>
    </div>`;
    renderCart();
    psrch('');
}

function psrch(q) {
    const allProducts = DB.products;
    const filtered = q ? allProducts.filter(p => 
        (p.name.includes(q) || p.barcode?.includes(q)) && p.quantity > 0
    ) : allProducts.filter(p => p.quantity > 0);

    const el = document.getElementById('pos-prods');
    if (!el) return;

    el.innerHTML = filtered.length
        ? filtered.slice(0, 24).map(p => `
            <div onclick="addCart(${p.id},'${p.name.replace(/'/g, '')}',${p.selling_price})"
                style="background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:13px;cursor:pointer;transition:all .18s"
                onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
                <div style="font-size:13px;font-weight:700;margin-bottom:5px">${p.name}</div>
                <div style="font-size:11px;color:var(--muted)">${p.brand} | متبقي: ${p.quantity}</div>
                <div style="font-size:16px;font-weight:900;color:var(--accent2);margin-top:7px">${fmt(p.selling_price)}</div>
            </div>`).join('')
        : em('لا توجد منتجات');
}

function addCart(id, name, price) {
    const ex = cart.find(i => i.id === id);
    if (ex) ex.qty++;
    else cart.push({ id, name, price, qty: 1 });
    renderCart();
}

function chQty(i, d) {
    cart[i].qty = Math.max(1, cart[i].qty + d);
    renderCart();
}

function rmItem(i) {
    cart.splice(i, 1);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function updRem() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const paid = parseFloat(document.getElementById('cp2')?.value) || 0;
    const rem = document.getElementById('cr');
    if (rem) rem.textContent = fmt(Math.max(0, total - paid));
}

function renderCart() {
    const el = document.getElementById('cart-items');
    if (!el) return;

    if (!cart.length) {
        el.innerHTML = '<p style="text-align:center;color:var(--muted);padding:18px">السلة فارغة</p>';
        document.getElementById('ct').textContent = '0';
        return;
    }

    el.innerHTML = cart.map((i, idx) => `<div class="ci"><div class="nm"><div>${i.name}</div><div style="font-size:12px;color:var(--muted)">${fmt(i.price)} × ${i.qty}</div></div><div style="display:flex;align-items:center;gap:5px"><button class="qb" onclick="chQty(${idx},-1)">−</button><span style="min-width:22px;text-align:center">${i.qty}</span><button class="qb" onclick="chQty(${idx},1)">+</button><button class="qb" style="background:rgba(255,71,87,.2);color:var(--danger)" onclick="rmItem(${idx})">×</button></div></div>`).join('');

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('ct').textContent = fmt(total);
    updRem();
}

function doSale() {
    if (!cart.length) {
        toast('السلة فارغة', 'error');
        return;
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const paid = parseFloat(document.getElementById('cp2').value) || total;

    // حساب الربح
    let profit = 0;
    cart.forEach(item => {
        const product = DB.products.find(p => p.id === item.id);
        if (product) {
            profit += (item.price - product.cost_price) * item.qty;
            // تحديث المخزون
            product.quantity -= item.qty;
            DB.saveProduct(product);
        }
    });

    const sale = {
        items: cart.map(i => ({
            product_id: i.id,
            quantity: i.qty,
            unit_price: i.price
        })),
        total_amount: total,
        paid_amount: paid,
        remaining_amount: Math.max(0, total - paid),
        payment_method: document.getElementById('cm').value,
        profit: profit,
        username: Auth.currentUser?.username || 'مستخدم'
    };

    DB.saveSale(sale);
    toast(`✅ فاتورة ${sale.invoice_number} | الإجمالي: ${fmt(total)}`);
    cart = [];
    renderCart();
    document.getElementById('cp2').value = '';
    psrch('');
}

// ============================================
// المبيعات
// ============================================
let salesData = [];
let salesFilterState = { search: '', from_date: '', to_date: new Date().toISOString().slice(0, 10) };

function sales(pr = 'اليوم') {
    const c = document.getElementById('pc');

    let html = `
    <div style="background:var(--bg2);border:2px solid var(--accent);border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="margin-bottom:15px">
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <input id="sale-search" type="text" placeholder="🔍 بحث الفاتورة..." style="flex:1;min-width:200px;padding:12px;border-radius:6px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-size:14px" onkeyup="filterSalesTable()">
          <input id="sale-from" type="date" style="padding:12px;border-radius:6px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-size:14px" onchange="filterSalesTable()">
          <input id="sale-to" type="date" style="padding:12px;border-radius:6px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-size:14px" onchange="filterSalesTable()">
          <button class="btn btn-ghost" onclick="filterSalesTable()" style="padding:12px 20px;font-size:14px">تصفية</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:15px">
        ${['اليوم', 'أسبوع', 'شهر', 'سنة', 'كل الوقت'].map(p => `<button class="btn ${p === pr ? 'btn-success' : 'btn-ghost'}" onclick="salesPeriod('${p}')" style="padding:10px 15px;font-size:14px;font-weight:bold">${p}</button>`).join('')}
      </div>

      <div style="border-top:2px solid var(--border);padding-top:15px;margin-top:15px">
        <button class="btn btn-danger" onclick="clearAllSales()" style="padding:15px 30px;font-size:16px;font-weight:bold;width:100%;background:var(--danger);color:white;border-radius:8px">
          🧹 تفريغ جميع الفواتير (حذف نهائي!)
        </button>
      </div>
    </div>

    <div class="tw">
      <div class="th"><h3>💰 سجل المبيعات</h3><span id="sale-stats" style="color:var(--muted);font-size:13px"></span></div>
      <div id="sales-table" style="overflow-x:auto"></div>
    </div>`;

    c.innerHTML = html;

    salesData = DB.sales || [];

    const [fromD, toD] = getDatesForPeriod(pr);

    const stats = {
        count: salesData.length,
        total: salesData.reduce((sum, s) => sum + s.total_amount, 0),
        profit: salesData.reduce((sum, s) => sum + (s.profit || 0), 0)
    };

    document.getElementById('sale-stats').textContent = `${stats.count} فاتورة | الإجمالي: ${fmt(stats.total)} | الربح: ${fmt(stats.profit)}`;
    renderSalesTable(salesData);

    setTimeout(() => {
        document.getElementById('sale-from').value = fromD;
        document.getElementById('sale-to').value = toD;
    }, 0);
}

function salesPeriod(p) {
    sales(p);
}

function filterSalesTable() {
    const search = document.getElementById('sale-search')?.value || '';
    const from = document.getElementById('sale-from')?.value || '';
    const to = document.getElementById('sale-to')?.value || '';

    let filtered = DB.sales;

    if (search) {
        filtered = filtered.filter(s => 
            s.invoice_number.includes(search) ||
            s.sale_date.includes(search)
        );
    }

    if (from) {
        filtered = filtered.filter(s => s.sale_date >= from);
    }

    if (to) {
        filtered = filtered.filter(s => s.sale_date <= to);
    }

    renderSalesTable(filtered);
}

function clearAllSales() {
    if (!confirm('🚨 هل تريد حذف جميع الفواتير؟\n\nهذا الإجراء نهائي ولا يمكن التراجع عنه!')) return;
    if (!confirm('⚠️ تأكيد نهائي: سيتم حذف جميع الفواتير!')) return;

    omo('🗑️ تفريغ الفواتير', `
    <div style="background:var(--bg3);padding:14px;border-radius:8px;color:var(--danger)">
        <p>🚨 تحذير: سيتم حذف جميع فواتير المبيعات من قاعدة البيانات</p>
        <p style="margin-top:10px;font-size:12px;color:var(--muted)">عدد الفواتير: <b>${DB.sales.length}</b></p>
    </div>`,
    `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-danger" onclick="confirmClearAllSales()">🗑️ حذف الكل</button>`);
}

function confirmClearAllSales() {
    DB.clearSales();
    cmo();
    toast('✅ تم حذف جميع الفواتير');
    sales('اليوم');
}

function getDatesForPeriod(period) {
    const today = new Date();
    let from = new Date();
    let to = new Date();

    if (period === 'اليوم') {
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
    } else if (period === 'أسبوع') {
        from.setDate(today.getDate() - today.getDay());
        to.setDate(from.getDate() + 6);
    } else if (period === 'شهر') {
        from.setDate(1);
        to.setMonth(today.getMonth() + 1, 0);
    } else if (period === 'سنة') {
        from.setMonth(0, 1);
        to.setMonth(11, 31);
    } else {
        return ['2020-01-01', today.toISOString().slice(0, 10)];
    }

    return [from.toISOString().slice(0, 10), to.toISOString().slice(0, 10)];
}

function renderSalesTable(data) {
    const tbl = document.getElementById('sales-table');
    if (!data || !data.length) {
        tbl.innerHTML = em('لا توجد مبيعات');
        return;
    }

    tbl.innerHTML = `
    <table style="width:100%">
      <tr>
        <th>رقم الفاتورة</th>
        <th>التاريخ</th>
        <th>الوقت</th>
        <th>المبلغ</th>
        <th>المدفوع</th>
        <th>المتبقي</th>
        <th>الربح</th>
        <th>الطريقة</th>
        <th>الكاشير</th>
        <th></th>
      </tr>
      ${data.map(s => `
      <tr>
        <td><b style="color:var(--accent)">${s.invoice_number}</b></td>
        <td>${s.sale_date}</td>
        <td>${s.sale_time || '—'}</td>
        <td>${fmt(s.total_amount)}</td>
        <td>${fmt(s.paid_amount)}</td>
        <td><span class="badge ${s.remaining_amount > 0 ? 'br' : 'bg'}">${fmt(s.remaining_amount)}</span></td>
        <td style="color:var(--accent2)">${fmt(s.profit || 0)}</td>
        <td>${s.payment_method || '—'}</td>
        <td>${s.username}</td>
        <td style="white-space:nowrap">
          <button class="btn btn-ghost btn-sm" onclick="vSale(${s.id})" title="عرض التفاصيل">👁️</button>
          ${s.remaining_amount > 0 ? `<button class="btn btn-warn btn-sm" onclick="paySale(${s.id},${s.remaining_amount})" title="تسجيل دفعة">💳</button>` : ''}
          <button class="btn btn-info btn-sm" onclick="returnToInventory(${s.id})" title="إرجاع إلى المخزون">↩️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteSale(${s.id})" title="حذف الفاتورة">🗑️</button>
        </td>
      </tr>`).join('')}
    </table>`;
}

function vSale(id) {
    const sale = DB.sales.find(s => s.id === id);
    if (!sale) return;

    let html = `
    <div style="background:var(--bg3);padding:14px;border-radius:9px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:10px">
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">رقم الفاتورة</span>
          <div style="font-weight:700;color:var(--accent);font-size:16px">${sale.invoice_number}</div>
        </div>
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">التاريخ والوقت</span>
          <div style="font-size:13px">${sale.sale_date} ${sale.sale_time || '—'}</div>
        </div>
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">الكاشير</span>
          <div style="font-size:13px">${sale.username || '—'}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">الإجمالي</span>
          <div style="font-weight:700;color:var(--accent2);font-size:15px">${fmt(sale.total_amount)}</div>
        </div>
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">المدفوع</span>
          <div style="font-weight:700;color:var(--accent2);font-size:15px">${fmt(sale.paid_amount)}</div>
        </div>
        <div>
          <span style="color:var(--muted);font-size:11px;display:block;margin-bottom:3px">المتبقي</span>
          <div style="font-weight:700;color:${sale.remaining_amount > 0 ? 'var(--danger)' : 'var(--accent2)'};font-size:15px">${fmt(sale.remaining_amount)}</div>
        </div>
      </div>
    </div>

    <table style="width:100%;margin-bottom:14px">
      <tr style="background:var(--bg3)">
        <th>المنتج</th>
        <th>الماركة</th>
        <th>الكمية</th>
        <th>سعر الوحدة</th>
        <th>الإجمالي</th>
        <th>الربح</th>
      </tr>
      ${sale.items.map(d => {
        const product = DB.products.find(p => p.id === d.product_id);
        return `
        <tr>
          <td><b>${d.name || product?.name || 'غير معروف'}</b></td>
          <td>${product?.brand || '—'}</td>
          <td style="text-align:center">${d.quantity}</td>
          <td>${fmt(d.unit_price || d.price)}</td>
          <td>${fmt(d.total_price || (d.quantity * d.unit_price))}</td>
          <td style="color:var(--accent2)">${fmt(d.profit || 0)}</td>
        </tr>`;
      }).join('')}
    </table>

    <div style="background:var(--bg3);padding:12px;border-radius:8px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <span style="color:var(--muted);font-size:11px">طريقة الدفع</span>
          <div style="font-weight:600;margin-top:3px">${sale.payment_method || 'نقدي'}</div>
        </div>
        <div>
          <span style="color:var(--muted);font-size:11px">إجمالي الربح</span>
          <div style="font-weight:600;color:var(--accent2);margin-top:3px">${fmt(sale.profit || 0)}</div>
        </div>
      </div>
    </div>`;

    omo(`📋 تفاصيل الفاتورة رقم: ${sale.invoice_number}`, html,
    `${sale.remaining_amount > 0 ? `<button class="btn btn-warn" onclick="paySale(${id},${sale.remaining_amount})">💳 تسجيل دفعة</button>` : ''}
    <button class="btn btn-ghost" onclick="cmo()">✖ إغلاق</button>`);
}

function returnToInventory(id) {
    const sale = DB.sales.find(s => s.id === id);
    if (!sale) {
        toast('خطأ في تحميل البيانات', 'error');
        return;
    }

    const html = `
    <div style="background:rgba(0,255,157,.08);border:1px solid var(--accent2);border-radius:9px;padding:14px;margin-bottom:14px">
        <b style="color:var(--accent2)">⚠️ سيتم إرجاع المنتجات للمخزون وحذف الفاتورة نهائياً</b>
    </div>
    <div style="background:var(--bg3);padding:12px;border-radius:9px;margin-bottom:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div><span style="color:var(--muted);font-size:11px">رقم الفاتورة</span><div style="font-weight:700;color:var(--accent)">${sale.invoice_number}</div></div>
        <div><span style="color:var(--muted);font-size:11px">التاريخ</span><div>${sale.sale_date}</div></div>
        <div><span style="color:var(--muted);font-size:11px">الإجمالي</span><div style="font-weight:700;color:var(--accent2)">${fmt(sale.total_amount)}</div></div>
    </div>
    <table style="width:100%;margin-bottom:12px">
        <tr style="background:var(--bg3)"><th>المنتج</th><th>الكمية</th><th>سعر الوحدة</th><th>الإجمالي</th><th>الربح</th></tr>
        ${sale.items.map(d => {
            const product = DB.products.find(p => p.id === d.product_id);
            return `<tr>
                <td><b>${d.name || product?.name || 'غير معروف'}</b></td>
                <td style="text-align:center">${d.quantity}</td>
                <td>${fmt(d.unit_price || d.price)}</td>
                <td>${fmt(d.total_price || (d.quantity * d.unit_price))}</td>
                <td style="color:var(--accent2)">${fmt(d.profit || 0)}</td>
            </tr>`;
        }).join('')}
    </table>
    <div style="background:var(--bg3);padding:12px;border-radius:8px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><span style="color:var(--muted);font-size:11px">المدفوع</span><div style="color:var(--accent2);font-weight:700">${fmt(sale.paid_amount)}</div></div>
        <div><span style="color:var(--muted);font-size:11px">المتبقي</span><div style="color:${sale.remaining_amount > 0 ? 'var(--danger)' : 'var(--accent2)'};font-weight:700">${fmt(sale.remaining_amount)}</div></div>
    </div>`;

    omo(`🔄 إرجاع فاتورة: ${sale.invoice_number}`, html,
    `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="confirmReturnToInventory(${id})">✅ إرجاع وحذف الفاتورة</button>`);
}

function confirmReturnToInventory(id) {
    const sale = DB.sales.find(s => s.id === id);
    if (!sale) {
        toast('خطأ في تحميل البيانات', 'error');
        return;
    }

    // إرجاع المنتجات للمخزون
    sale.items.forEach(item => {
        const product = DB.products.find(p => p.id === item.product_id);
        if (product) {
            product.quantity += item.quantity;
            DB.saveProduct(product);
        }
    });

    // حذف الفاتورة
    DB.deleteSale(id);

    cmo();
    toast('✅ تم إرجاع المنتجات للمخزون وحذف الفاتورة');
    sales('اليوم');
}

function paySale(id, rem) {
    omo('💳 تسجيل دفعة', `
    <div class="ff" style="margin-bottom:14px">
        <label style="color:var(--muted);font-size:12px">المبلغ المتبقي: <b style="color:var(--accent)">${fmt(rem)}</b></label>
        <input id="pay-amount" type="number" value="${rem}" style="margin-top:6px;background:var(--bg3);border:1px solid var(--border);padding:10px;border-radius:7px;color:var(--text);width:100%" placeholder="أدخل المبلغ">
    </div>
    <div class="ff">
        <label style="color:var(--muted);font-size:12px">طريقة الدفع</label>
        <select id="pay-method" style="margin-top:6px;background:var(--bg3);border:1px solid var(--border);padding:10px;border-radius:7px;color:var(--text);width:100%">
            <option>نقدي</option>
            <option>بطاقة</option>
            <option>تحويل</option>
            <option>شيك</option>
        </select>
    </div>`,
    `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="subPaySale(${id})">✅ تأكيد الدفع</button>`);
}

function subPaySale(id) {
    const amount = document.getElementById('pay-amount').value;
    const method = document.getElementById('pay-method').value;

    if (!amount || parseFloat(amount) <= 0) {
        toast('أدخل مبلغاً صحيحاً', 'error');
        return;
    }

    const sale = DB.sales.find(s => s.id === id);
    if (!sale) {
        toast('خطأ في تحميل البيانات', 'error');
        return;
    }

    sale.paid_amount += parseFloat(amount);
    sale.remaining_amount = Math.max(0, sale.total_amount - sale.paid_amount);

    DB.saveSale(sale);

    cmo();
    toast('✅ تم تسجيل الدفعة بنجاح');
    sales('اليوم');
}

function deleteSale(id) {
    if (!confirm('هل تريد حذف هذه الفاتورة؟')) return;

    omo('🗑️ حذف الفاتورة', `
    <div style="background:var(--bg3);padding:14px;border-radius:8px;color:var(--danger)">
        <p>⚠️ هذا سيحذف الفاتورة من قاعدة البيانات</p>
        <p style="margin-top:10px;font-size:12px;color:var(--muted)">ملاحظة: لن يتم استرجاع المنتجات للمخزون تلقائياً</p>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-danger" onclick="confirmDeleteSale(${id})">🗑️ حذف</button>`);
}

function confirmDeleteSale(id) {
    DB.deleteSale(id);
    cmo();
    toast('✅ تم حذف الفاتورة');
    sales('اليوم');
}

// ============================================
// المصاريف
// ============================================
function expenses() {
    const c = document.getElementById('pc');
    const allExpenses = DB.expenses;

    c.innerHTML = `<div class="sb-bar"><input class="si" id="es" placeholder="🔍 بحث..." oninput="filterExpenses()"><button class="btn btn-success" onclick="addExpense()">+ إضافة مصروف</button></div>
    <div class="tw"><div class="th"><h3>💸 المصاريف</h3><span id="ecnt" style="color:var(--muted);font-size:13px"></span></div><div id="et">${ld()}</div></div>`;

    document.getElementById('ecnt').textContent = allExpenses.length + ' مصروف';
    renderExpenses(allExpenses);
}

function renderExpenses(expenses) {
    const el = document.getElementById('et');
    if (!el) return;

    if (!expenses.length) {
        el.innerHTML = em('لا توجد مصاريف');
        return;
    }

    el.innerHTML = `<table><tr><th>التاريخ</th><th>الوصف</th><th>المبلغ</th><th>النوع</th><th></th></tr>
    ${expenses.map(e => `<tr><td>${e.date}</td><td>${e.description}</td><td>${fmt(e.amount)}</td><td>${e.type || 'عام'}</td>
    <td style="white-space:nowrap"><button class="btn btn-danger btn-sm" onclick="deleteExpense(${e.id})">🗑️</button></td></tr>`).join('')}</table>`;
}

function addExpense() {
    omo('➕ إضافة مصروف', `
    <div class="fg">
        <div class="ff full"><label>الوصف</label><input id="ed" placeholder="وصف المصروف"></div>
        <div class="ff"><label>المبلغ</label><input id="ea" type="number" placeholder="0"></div>
        <div class="ff"><label>النوع</label><select id="et"><option>عام</option><option>إيجار</option><option>كهرباء</option><option>ماء</option><option>راتب</option><option>أخرى</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="saveExpense()">💾 حفظ</button>`);
}

function saveExpense() {
    const description = document.getElementById('ed').value;
    const amount = parseFloat(document.getElementById('ea').value) || 0;
    const type = document.getElementById('et').value;

    if (!description || amount <= 0) {
        toast('يرجى ملء البيانات بشكل صحيح', 'error');
        return;
    }

    DB.saveExpense({ description, amount, type });
    cmo();
    toast('✅ تم حفظ المصروف');
    expenses();
}

function deleteExpense(id) {
    if (!confirm('هل تريد حذف هذا المصروف؟')) return;
    DB.deleteExpense(id);
    toast('✅ تم حذف المصروف');
    expenses();
}

function filterExpenses() {
    const search = document.getElementById('es')?.value || '';
    const allExpenses = DB.expenses;

    if (!search) {
        renderExpenses(allExpenses);
        return;
    }

    const filtered = allExpenses.filter(e => 
        e.description.includes(search) ||
        e.type?.includes(search)
    );

    renderExpenses(filtered);
}

// ============================================
// إدارة المستخدمين
// ============================================
function users() {
    const c = document.getElementById('pc');
    const allUsers = DB.users;

    c.innerHTML = `<div class="sb-bar"><button class="btn btn-success" onclick="addUser()">+ إضافة مستخدم</button></div>
    <div class="tw"><div class="th"><h3>👥 المستخدمون</h3></div><div id="ut">${ld()}</div></div>`;

    document.getElementById('ut').innerHTML = allUsers.length
        ? `<table><tr><th>الاسم</th><th>اسم المستخدم</th><th>الدور</th><th></th></tr>
        ${allUsers.map(u => `<tr><td>${u.name}</td><td>${u.username}</td><td>${u.role}</td>
        <td style="white-space:nowrap"><button class="btn btn-ghost btn-sm" onclick='eUser(${JSON.stringify(u)})'>✏️</button> ${u.username !== 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">🗑️</button>` : ''}</td></tr>`).join('')}</table>`
        : em();
}

function addUser() {
    omo('➕ إضافة مستخدم جديد', `
    <div class="fg">
        <div class="ff"><label>الاسم</label><input id="un" placeholder="اسم المستخدم"></div>
        <div class="ff"><label>اسم المستخدم</label><input id="uu" placeholder="username"></div>
        <div class="ff"><label>كلمة المرور</label><input id="up" type="password" placeholder="password"></div>
        <div class="ff"><label>الدور</label><select id="ur"><option value="user">مستخدم</option><option value="admin">مدير</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="saveUser()">💾 حفظ</button>`);
}

function saveUser() {
    const name = document.getElementById('un').value;
    const username = document.getElementById('uu').value;
    const password = document.getElementById('up').value;
    const role = document.getElementById('ur').value;

    if (!name || !username || !password) {
        toast('يرجى ملء جميع الحقول', 'error');
        return;
    }

    // التحقق من عدم تكرار اسم المستخدم
    if (DB.users.find(u => u.username === username)) {
        toast('اسم المستخدم موجود بالفعل', 'error');
        return;
    }

    DB.saveUser({ name, username, password, role });
    cmo();
    toast('✅ تم إضافة المستخدم');
    users();
}

function eUser(u) {
    omo('✏️ تعديل المستخدم', `
    <div class="fg">
        <div class="ff"><label>الاسم</label><input id="eun" value="${u.name}"></div>
        <div class="ff"><label>اسم المستخدم</label><input id="euu" value="${u.username}" ${u.username === 'admin' ? 'readonly' : ''}></div>
        <div class="ff"><label>كلمة المرور</label><input id="eup" type="password" placeholder="اتركه فارغاً للإبقاء على الحالي"></div>
        <div class="ff"><label>الدور</label><select id="eur"><option value="user" ${u.role === 'user' ? 'selected' : ''}>مستخدم</option><option value="admin" ${u.role === 'admin' ? 'selected' : ''}>مدير</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="updateUser(${u.id})">💾 حفظ</button>`);
}

function updateUser(id) {
    const user = DB.users.find(u => u.id === id);
    if (!user) return;

    user.name = document.getElementById('eun').value;
    if (user.username !== 'admin') {
        user.username = document.getElementById('euu').value;
    }
    const password = document.getElementById('eup').value;
    if (password) {
        user.password = password;
    }
    user.role = document.getElementById('eur').value;

    DB.saveUser(user);
    cmo();
    toast('✅ تم تحديث المستخدم');
    users();
}

function deleteUser(id) {
    if (!confirm('هل تريد حذف هذا المستخدم؟')) return;
    DB.deleteUser(id);
    toast('✅ تم حذف المستخدم');
    users();
}

// ============================================
// الإعدادات
// ============================================
function settings() {
    const settings = DB.settings;

    const c = document.getElementById('pc');
    c.innerHTML = `
    <div class="tw">
        <div class="th"><h3>⚙️ الإعدادات</h3></div>
        <div style="padding:20px">
            <div class="fg">
                <div class="ff"><label>اسم الشركة</label><input id="sn" value="${settings.companyName || ''}"></div>
                <div class="ff"><label>العملة</label><input id="sc" value="${settings.currency || ''}"></div>
                <div class="ff"><label>اللغة</label><select id="sl"><option value="ar" ${settings.language === 'ar' ? 'selected' : ''}>العربية</option><option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option></select></div>
                <div class="ff"><label>السمة</label><select id="st"><option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>داكن</option><option value="light" ${settings.theme === 'light' ? 'selected' : ''}>فاتح</option></select></div>
            </div>
            <div style="margin-top:20px">
                <button class="btn btn-success" onclick="saveSettings()">💾 حفظ الإعدادات</button>
                <button class="btn btn-danger" onclick="resetAllData()">🗑️ إعادة تعيين جميع البيانات</button>
            </div>
        </div>
    </div>`;
}

function saveSettings() {
    const settings = {
        companyName: document.getElementById('sn').value,
        currency: document.getElementById('sc').value,
        language: document.getElementById('sl').value,
        theme: document.getElementById('st').value
    };

    DB.saveSettings(settings);
    toast('✅ تم حفظ الإعدادات');
}

function resetAllData() {
    if (!confirm('⚠️ هل تريد حذف جميع البيانات؟\n\nهذا الإجراء نهائي ولا يمكن التراجع عنه!')) return;
    if (!confirm('🚨 تأكيد نهائي: سيتم حذف جميع البيانات!')) return;

    localStorage.clear();
    DB.init();
    toast('✅ تم إعادة تعيين جميع البيانات');
    location.reload();
}

// ============================================
// الصفحات الأخرى
// ============================================
// ═══════════════════════════════════════════════════════════
//  PRODUCTS (إدارة الموبايلات)
// ═══════════════════════════════════════════════════════════
let productsData = [];

function products() {
    const c = document.getElementById('pc');
    const allProducts = DB.products;

    c.innerHTML = `
    <div class="sb-bar">
        <input class="si" id="ps" placeholder="🔍 بحث..." oninput="filterProducts()">
        <select class="si" id="pcat" onchange="filterProducts()" style="width:150px">
            <option value="">كل الفئات</option>
            <option value="موبايلات">موبايلات</option>
            <option value="ملحقات">ملحقات</option>
            <option value="أجهزة لوحية">أجهزة لوحية</option>
            <option value="أخرى">أخرى</option>
        </select>
        <select class="si" id="pcond" onchange="filterProducts()" style="width:120px">
            <option value="">كل الحالات</option>
            <option value="جديد">جديد</option>
            <option value="مستعمل">مستعمل</option>
        </select>
        <button class="btn btn-success" onclick="addProduct()">+ إضافة منتج</button>
    </div>
    <div class="tw">
        <div class="th">
            <h3>📱 إدارة الموبايلات</h3>
            <span id="pcnt" style="color:var(--muted);font-size:13px"></span>
        </div>
        <div id="pt">${ld()}</div>
    </div>`;

    document.getElementById('pcnt').textContent = allProducts.length + ' منتج';
    renderProducts(allProducts);
}

function renderProducts(products) {
    const el = document.getElementById('pt');
    if (!el) return;

    if (!products.length) {
        el.innerHTML = em('لا توجد منتجات');
        return;
    }

    el.innerHTML = `
    <table style="width:100%">
        <tr>
            <th>المنتج</th>
            <th>الماركة</th>
            <th>الفئة</th>
            <th>الحالة</th>
            <th>المخزون</th>
            <th>سعر الشراء</th>
            <th>سعر البيع</th>
            <th>الربح</th>
            <th></th>
        </tr>
        ${products.map(p => `
        <tr style="${p.quantity <= p.min_stock ? 'background:rgba(255,71,87,.08)' : ''}">
            <td>
                <b>${p.name}</b>
                ${p.barcode ? `<br><span style="font-size:11px;color:var(--muted)">📊 ${p.barcode}</span>` : ''}
            </td>
            <td>${p.brand}</td>
            <td>${p.category}</td>
            <td>${p.condition || '-'}</td>
            <td>
                <span style="${p.quantity <= p.min_stock ? 'color:var(--danger);font-weight:700' : ''}">
                    ${p.quantity}
                </span>
                ${p.quantity <= p.min_stock ? '<span style="color:var(--danger);font-size:11px">⚠️ منخفض</span>' : ''}
            </td>
            <td>${fmt(p.cost_price)}</td>
            <td>${fmt(p.selling_price)}</td>
            <td style="color:var(--accent2)">${fmt(p.selling_price - p.cost_price)}</td>
            <td style="white-space:nowrap">
                <button class="btn btn-ghost btn-sm" onclick='eProduct(${JSON.stringify(p)})' title="تعديل">✏️</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})" title="حذف">🗑️</button>
            </td>
        </tr>`).join('')}
    </table>`;
}

function filterProducts() {
    const search = document.getElementById('ps')?.value || '';
    const category = document.getElementById('pcat')?.value || '';
    const condition = document.getElementById('pcond')?.value || '';
    const allProducts = DB.products;

    let filtered = allProducts;

    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase()) ||
            p.model?.toLowerCase().includes(search.toLowerCase()) ||
            p.barcode?.includes(search)
        );
    }

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (condition) {
        filtered = filtered.filter(p => p.condition === condition);
    }

    renderProducts(filtered);
}

function addProduct() {
    omo('➕ إضافة منتج جديد', `
    <div class="fg">
        <div class="ff full">
            <label>اسم المنتج *</label>
            <input id="pn" placeholder="مثال: iPhone 15 Pro">
        </div>
        <div class="ff">
            <label>الماركة *</label>
            <input id="pb" placeholder="مثال: Apple">
        </div>
        <div class="ff">
            <label>الموديل</label>
            <input id="pm" placeholder="مثال: A1234">
        </div>
        <div class="ff">
            <label>الفئة *</label>
            <select id="pcat">
                <option value="موبايلات">موبايلات</option>
                <option value="ملحقات">ملحقات</option>
                <option value="أجهزة لوحية">أجهزة لوحية</option>
                <option value="أخرى">أخرى</option>
            </select>
        </div>
        <div class="ff">
            <label>الحالة</label>
            <select id="pcond">
                <option value="جديد">جديد</option>
                <option value="مستعمل">مستعمل</option>
                <option value="-">-</option>
            </select>
        </div>
        <div class="ff">
            <label>الكمية *</label>
            <input id="pq" type="number" value="1" min="0">
        </div>
        <div class="ff">
            <label>الحد الأدنى</label>
            <input id="pmin" type="number" value="5" min="0">
        </div>
        <div class="ff">
            <label>سعر الشراء *</label>
            <input id="pcp" type="number" value="0" step="0.01">
        </div>
        <div class="ff">
            <label>سعر البيع *</label>
            <input id="psp" type="number" value="0" step="0.01">
        </div>
        <div class="ff full">
            <label>الباركود</label>
            <input id="pbar" placeholder="اختياري">
        </div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="saveProduct()">💾 حفظ</button>`);
}

function saveProduct() {
    const name = document.getElementById('pn').value;
    const brand = document.getElementById('pb').value;
    const model = document.getElementById('pm').value;
    const category = document.getElementById('pcat').value;
    const condition = document.getElementById('pcond').value;
    const quantity = parseInt(document.getElementById('pq').value) || 0;
    const min_stock = parseInt(document.getElementById('pmin').value) || 5;
    const cost_price = parseFloat(document.getElementById('pcp').value) || 0;
    const selling_price = parseFloat(document.getElementById('psp').value) || 0;
    const barcode = document.getElementById('pbar').value;

    if (!name || !brand || !category || cost_price <= 0 || selling_price <= 0) {
        toast('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
        return;
    }

    DB.saveProduct({
        name,
        brand,
        model,
        category,
        condition,
        quantity,
        min_stock,
        cost_price,
        selling_price,
        barcode
    });

    cmo();
    toast('✅ تم حفظ المنتج');
    products();
}

function eProduct(p) {
    omo('✏️ تعديل المنتج', `
    <div class="fg">
        <div class="ff full">
            <label>اسم المنتج *</label>
            <input id="epn" value="${p.name}">
        </div>
        <div class="ff">
            <label>الماركة *</label>
            <input id="epb" value="${p.brand}">
        </div>
        <div class="ff">
            <label>الموديل</label>
            <input id="epm" value="${p.model || ''}">
        </div>
        <div class="ff">
            <label>الفئة *</label>
            <select id="epcat">
                <option value="موبايلات" ${p.category === 'موبايلات' ? 'selected' : ''}>موبايلات</option>
                <option value="ملحقات" ${p.category === 'ملحقات' ? 'selected' : ''}>ملحقات</option>
                <option value="أجهزة لوحية" ${p.category === 'أجهزة لوحية' ? 'selected' : ''}>أجهزة لوحية</option>
                <option value="أخرى" ${p.category === 'أخرى' ? 'selected' : ''}>أخرى</option>
            </select>
        </div>
        <div class="ff">
            <label>الحالة</label>
            <select id="epcond">
                <option value="جديد" ${p.condition === 'جديد' ? 'selected' : ''}>جديد</option>
                <option value="مستعمل" ${p.condition === 'مستعمل' ? 'selected' : ''}>مستعمل</option>
                <option value="-" ${p.condition === '-' || !p.condition ? 'selected' : ''}>-</option>
            </select>
        </div>
        <div class="ff">
            <label>الكمية *</label>
            <input id="epq" type="number" value="${p.quantity}" min="0">
        </div>
        <div class="ff">
            <label>الحد الأدنى</label>
            <input id="epmin" type="number" value="${p.min_stock}" min="0">
        </div>
        <div class="ff">
            <label>سعر الشراء *</label>
            <input id="epcp" type="number" value="${p.cost_price}" step="0.01">
        </div>
        <div class="ff">
            <label>سعر البيع *</label>
            <input id="epsp" type="number" value="${p.selling_price}" step="0.01">
        </div>
        <div class="ff full">
            <label>الباركود</label>
            <input id="epbar" value="${p.barcode || ''}">
        </div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="updateProduct(${p.id})">💾 حفظ</button>`);
}

function updateProduct(id) {
    const product = DB.products.find(p => p.id === id);
    if (!product) return;

    product.name = document.getElementById('epn').value;
    product.brand = document.getElementById('epb').value;
    product.model = document.getElementById('epm').value;
    product.category = document.getElementById('epcat').value;
    product.condition = document.getElementById('epcond').value;
    product.quantity = parseInt(document.getElementById('epq').value) || 0;
    product.min_stock = parseInt(document.getElementById('epmin').value) || 5;
    product.cost_price = parseFloat(document.getElementById('epcp').value) || 0;
    product.selling_price = parseFloat(document.getElementById('epsp').value) || 0;
    product.barcode = document.getElementById('epbar').value;

    if (!product.name || !product.brand || !product.category || product.cost_price <= 0 || product.selling_price <= 0) {
        toast('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
        return;
    }

    DB.saveProduct(product);
    cmo();
    toast('✅ تم تحديث المنتج');
    products();
}

function deleteProduct(id) {
    if (!confirm('هل تريد حذف هذا المنتج؟')) return;

    // التحقق من عدم وجود المنتج في مبيعات نشطة
    const hasActiveSales = DB.sales.some(sale => 
        sale.items.some(item => item.product_id === id)
    );

    if (hasActiveSales) {
        toast('⚠️ لا يمكن حذف المنتج لأنه موجود في مبيعات سابقة', 'error');
        return;
    }

    DB.deleteProduct(id);
    toast('✅ تم حذف المنتج');
    products();
}

// ═══════════════════════════════════════════════════════════
//  PURCHASES
// ═══════════════════════════════════════════════════════════
let purchasesData=[];

async function purchases(pr='شهر'){
  const c=document.getElementById('pc');
  let html=`
  <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:18px">
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
      <input id="purch-search" type="text" placeholder="🔍 بحث في الفواتير..." class="si" style="flex:1;min-width:200px" onkeyup="filterPurchasesTable()">
      <input id="purch-from" type="date" class="si" style="flex:0;width:150px" onchange="filterPurchasesTable()">
      <input id="purch-to" type="date" class="si" style="flex:0;width:150px" onchange="filterPurchasesTable()">
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      ${['أسبوع','شهر','سنة','كل الوقت'].map(p=>`<button class="btn ${p===pr?'btn-success':'btn-ghost'} btn-sm" onclick="purchasesPeriod('${p}')">${p}</button>`).join('')}
      <div style="flex:1"></div>
      <button class="btn btn-success" onclick="openAddPurch()" style="padding:10px 22px;font-size:15px;font-weight:700">🛒 إضافة فاتورة شراء</button>
    </div>
  </div>
  <div class="tw">
    <div class="th"><h3>🛍️ سجل المشتريات</h3><span id="purch-stats" style="color:var(--muted);font-size:13px"></span></div>
    <div id="purchases-table" style="overflow-x:auto"></div>
  </div>`;
  c.innerHTML=html;
  const r=await api(`/api/purchases?period=${encodeURIComponent(pr)}`);
  purchasesData=r.data||[];
  const[fromD,toD]=getDatesForPeriod(pr);
  const total=purchasesData.reduce((s,p)=>s+p.total_amount,0);
  const rem=purchasesData.reduce((s,p)=>s+p.remaining_amount,0);
  document.getElementById('purch-stats').textContent=`${purchasesData.length} فاتورة | الإجمالي: ${fmt(total)} | المتبقي: ${fmt(rem)}`;
  renderPurchasesTable(purchasesData);
  setTimeout(()=>{document.getElementById('purch-from').value=fromD;document.getElementById('purch-to').value=toD;},0);
}

// ── فتح واجهة إضافة فاتورة شراء (كاملة بدون مودال) ──────────
let purchCart=[];
let purchProds=[];
let purchSups=[];

async function openAddPurch(){
  const[sr,pr]=await Promise.all([api('/api/suppliers'),api('/api/products')]);
  purchSups=sr.data||[];
  purchProds=pr.data||[];
  purchCart=[];

  const ov=document.createElement('div');
  ov.id='purch-overlay';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px';
  ov.innerHTML=`
  <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;width:100%;max-width:900px;max-height:95vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7)">
    <!-- Header -->
    <div style="padding:18px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(0,212,255,.08),rgba(0,255,157,.04))">
      <h2 style="margin:0;font-size:18px;color:var(--accent)">🛒 إضافة فاتورة شراء جديدة</h2>
      <button onclick="closePurchOverlay()" style="background:none;border:none;color:var(--muted);font-size:22px;cursor:pointer;line-height:1">✕</button>
    </div>

    <!-- Tabs: existing / new product -->
    <div style="padding:10px 22px 0;border-bottom:1px solid var(--border);display:flex;gap:0">
      <button id="tab-exist" onclick="switchPurchTab('exist')" style="padding:9px 20px;border:none;border-bottom:3px solid var(--accent);background:rgba(0,212,255,.08);color:var(--accent);font-family:Cairo,sans-serif;font-size:14px;font-weight:700;cursor:pointer;border-radius:8px 8px 0 0">📦 منتج موجود</button>
      <button id="tab-new" onclick="switchPurchTab('new')" style="padding:9px 20px;border:none;border-bottom:3px solid transparent;background:none;color:var(--muted);font-family:Cairo,sans-serif;font-size:14px;font-weight:600;cursor:pointer;border-radius:8px 8px 0 0">✨ منتج جديد</button>
    </div>

    <!-- Tab: Existing Product -->
    <div id="purch-tab-exist" style="padding:14px 22px;border-bottom:1px solid var(--border)">
      <!-- Supplier row inside tab -->
      <div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:12px;flex-wrap:wrap">
        <div style="flex:2;min-width:180px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">🏢 المورد (اختياري)</label>
          <select id="pu-sup" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 12px;color:var(--text);font-size:14px">
            <option value="">— بدون مورد —</option>
            ${purchSups.map(s=>`<option value="${s.id}">${s.name}${s.phone?' ('+s.phone+')':''}</option>`).join('')}
          </select>
        </div>
        <button onclick="quickAddSupplierInline()" style="padding:9px 14px;background:rgba(0,212,255,.1);border:1px solid var(--accent);border-radius:7px;color:var(--accent);font-size:13px;cursor:pointer;white-space:nowrap;font-family:Cairo,sans-serif">➕ مورد جديد</button>
      </div>
      <!-- Product row -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:2;min-width:180px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">المنتج</label>
          <input id="pu-prod-search" list="pu-prod-list" placeholder="ابحث أو اختر منتج..." autocomplete="off"
            style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 12px;color:var(--text);font-size:14px">
          <datalist id="pu-prod-list">
            ${purchProds.map(p=>`<option value="${p.name}" data-id="${p.id}">${p.brand} | مخزون: ${p.quantity} | شراء: ${p.cost_price}</option>`).join('')}
          </datalist>
        </div>
        <div style="width:80px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الكمية</label>
          <input id="pu-exist-qty" type="number" value="1" min="1" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px">
        </div>
        <div style="width:120px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">سعر الشراء</label>
          <input id="pu-exist-price" type="number" value="0" step="0.01" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px">
        </div>
        <div style="width:120px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">سعر البيع</label>
          <input id="pu-exist-sell" type="number" value="0" step="0.01" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px">
        </div>
        <button onclick="addExistToPurchCart()" style="padding:9px 18px;background:var(--accent2);color:#0f1923;border:none;border-radius:7px;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap;font-family:Cairo,sans-serif">➕ إضافة</button>
      </div>
    </div>

    <!-- Tab: New Product -->
    <div id="purch-tab-new" style="padding:14px 22px;border-bottom:1px solid var(--border);display:none">
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:2;min-width:140px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الاسم *</label>
          <input id="pu-new-name" placeholder="اسم المنتج" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 12px;color:var(--text);font-size:14px">
        </div>
        <div style="flex:1;min-width:100px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الماركة *</label>
          <input id="pu-new-brand" placeholder="Apple..." style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 12px;color:var(--text);font-size:14px">
        </div>
        <div style="width:110px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الفئة</label>
          <select id="pu-new-cat" onchange="togglePurchCondition()" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:13px">
            <option>موبايلات</option><option>ملحقات</option><option>أجهزة لوحية</option><option>أخرى</option>
          </select>
        </div>
        <div id="pu-cond-wrap" style="width:95px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الحالة</label>
          <select id="pu-new-cond" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:13px">
            <option>جديد</option><option>مستعمل</option>
          </select>
        </div>
        <div style="width:70px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الكمية</label>
          <input id="pu-new-qty" type="number" value="1" min="1" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:14px">
        </div>
        <div style="width:110px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">سعر الشراء *</label>
          <input id="pu-new-cost" type="number" value="0" step="0.01" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:14px">
        </div>
        <div style="width:110px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">سعر البيع</label>
          <input id="pu-new-sell" type="number" value="0" step="0.01" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:14px">
        </div>
        <div style="width:110px">
          <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:5px">الباركود</label>
          <input id="pu-new-bar" placeholder="اختياري" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 8px;color:var(--text);font-size:13px">
        </div>
        <button onclick="addNewToPurchCart()" style="padding:9px 18px;background:var(--accent2);color:#0f1923;border:none;border-radius:7px;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap;font-family:Cairo,sans-serif">➕ إضافة</button>
      </div>
    </div>

    <!-- Cart -->
    <div style="flex:1;overflow-y:auto;padding:0 22px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 6px">
        <b style="color:var(--accent);font-size:14px">📋 المنتجات المضافة</b>
        <span id="pu-cart-cnt" style="color:var(--muted);font-size:13px">0 منتج</span>
      </div>
      <div id="pu-cart-table"></div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 22px;border-top:1px solid var(--border);background:var(--bg3);border-radius:0 0 16px 16px">
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="color:var(--muted);font-size:14px">المبلغ الإجمالي:</span>
          <span id="pu-total" style="font-size:22px;font-weight:900;color:var(--accent)">0</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <label style="color:var(--muted);font-size:14px;white-space:nowrap">المبلغ المدفوع:</label>
          <input id="pu-paid" type="number" value="0" step="0.01" style="width:140px;background:var(--bg2);border:2px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:15px;font-weight:700">
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="color:var(--muted);font-size:13px">المتبقي:</span>
          <span id="pu-remaining" style="font-size:16px;font-weight:700;color:var(--warn)">0</span>
        </div>
        <div style="flex:1"></div>
        <button onclick="closePurchOverlay()" style="padding:11px 22px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;cursor:pointer;font-family:Cairo,sans-serif">إلغاء</button>
        <button onclick="savePurchNew()" style="padding:11px 26px;background:var(--accent2);color:#0f1923;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;font-family:Cairo,sans-serif">💾 حفظ الفاتورة</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(ov);
  document.getElementById('pu-paid').addEventListener('input',updatePurchTotals);
}

function quickAddSupplierInline(){
  const div=document.createElement('div');
  div.id='quick-sup-popup';
  div.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:400;display:flex;align-items:center;justify-content:center';
  div.innerHTML=`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:24px;width:400px;max-width:95vw">
    <h3 style="margin:0 0 16px;color:var(--accent)">➕ إضافة مورد جديد</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
      <div><label style="font-size:12px;color:var(--muted)">الاسم *</label><input id="qsn" style="width:100%;margin-top:5px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px"></div>
      <div><label style="font-size:12px;color:var(--muted)">الهاتف</label><input id="qsp" style="width:100%;margin-top:5px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px"></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px">
      <button onclick="document.getElementById('quick-sup-popup').remove()" style="padding:9px 18px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;color:var(--text);cursor:pointer;font-family:Cairo,sans-serif">إلغاء</button>
      <button onclick="saveQuickSupplier()" style="padding:9px 20px;background:var(--accent2);color:#0f1923;border:none;border-radius:7px;font-weight:700;cursor:pointer;font-family:Cairo,sans-serif">💾 حفظ</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  setTimeout(()=>document.getElementById('qsn')?.focus(),100);
}

async function saveQuickSupplier(){
  const name=document.getElementById('qsn')?.value.trim();
  const phone=document.getElementById('qsp')?.value.trim()||'';
  if(!name){toast('أدخل اسم المورد','error');return;}
  const r=await api('/api/suppliers/add','POST',{name,phone,email:'',address:''});
  if(r.success){
    document.getElementById('quick-sup-popup')?.remove();
    toast('✅ تم إضافة المورد');
    const sr=await api('/api/suppliers');
    purchSups=sr.data||[];
    const sel=document.getElementById('pu-sup');
    if(sel){
      const cur=sel.value;
      sel.innerHTML=`<option value="">— بدون مورد —</option>${purchSups.map(s=>`<option value="${s.id}">${s.name}${s.phone?' ('+s.phone+')':''}</option>`).join('')}`;
      if(r.data?.id) sel.value=r.data.id;
      else sel.value=cur;
    }
  }else toast(r.message,'error');
}

function closePurchOverlay(){document.getElementById('purch-overlay')?.remove();}

function switchPurchTab(tab){
  const isExist=tab==='exist';
  document.getElementById('purch-tab-exist').style.display=isExist?'block':'none';
  document.getElementById('purch-tab-new').style.display=isExist?'none':'block';
  document.getElementById('tab-exist').style.cssText=`padding:9px 20px;border:none;border-bottom:3px solid ${isExist?'var(--accent)':'transparent'};background:${isExist?'rgba(0,212,255,.08)':'none'};color:${isExist?'var(--accent)':'var(--muted)'};font-family:Cairo,sans-serif;font-size:14px;font-weight:${isExist?700:600};cursor:pointer;border-radius:8px 8px 0 0`;
  document.getElementById('tab-new').style.cssText=`padding:9px 20px;border:none;border-bottom:3px solid ${!isExist?'var(--accent)':'transparent'};background:${!isExist?'rgba(0,212,255,.08)':'none'};color:${!isExist?'var(--accent)':'var(--muted)'};font-family:Cairo,sans-serif;font-size:14px;font-weight:${!isExist?700:600};cursor:pointer;border-radius:8px 8px 0 0`;
}

function togglePurchCondition(){
  const cat=document.getElementById('pu-new-cat')?.value;
  const wrap=document.getElementById('pu-cond-wrap');
  if(wrap) wrap.style.display=cat==='موبايلات'?'block':'none';
}

function updatePurchTotals(){
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  const paid=parseFloat(document.getElementById('pu-paid')?.value)||0;
  const rem=document.getElementById('pu-remaining');
  if(rem) rem.textContent=fmt(Math.max(0,total-paid));
  if(rem) rem.style.color=total-paid>0?'var(--warn)':'var(--accent2)';
  const el=document.getElementById('pu-total');
  if(el) el.textContent=fmt(total);
}

function renderPurchCart(){
  const el=document.getElementById('pu-cart-table');
  if(!el)return;
  const cnt=document.getElementById('pu-cart-cnt');
  if(cnt) cnt.textContent=purchCart.length+' منتج';
  if(!purchCart.length){
    el.innerHTML=`<div style="text-align:center;padding:28px;color:var(--muted)">📭 لم تُضف أي منتجات بعد</div>`;
    updatePurchTotals();return;
  }
  el.innerHTML=`<table style="width:100%;border-collapse:collapse">
    <tr style="background:var(--bg3)"><th style="padding:9px 12px;text-align:right;font-size:12px;color:var(--muted)">المنتج</th><th style="padding:9px;font-size:12px;color:var(--muted)">الكمية</th><th style="padding:9px;font-size:12px;color:var(--muted)">سعر الشراء</th><th style="padding:9px;font-size:12px;color:var(--muted)">سعر البيع</th><th style="padding:9px;font-size:12px;color:var(--muted)">المجموع</th><th style="padding:9px"></th></tr>
    ${purchCart.map((item,i)=>`<tr style="border-bottom:1px solid var(--border)">
      <td style="padding:10px 12px"><b>${item.name}</b><br><span style="font-size:11px;color:var(--muted)">${item.isNew?'🆕 منتج جديد':'📦 موجود'} | ${item.category||''}</span></td>
      <td style="padding:10px;text-align:center">${item.quantity}</td>
      <td style="padding:10px;text-align:center;color:var(--accent)">${fmt(item.cost_price)}</td>
      <td style="padding:10px;text-align:center;color:var(--accent2)">${fmt(item.sell_price||0)}</td>
      <td style="padding:10px;text-align:center;font-weight:700">${fmt(item.total)}</td>
      <td style="padding:10px"><button onclick="removePurchCartItem(${i})" style="background:rgba(255,71,87,.15);border:none;color:var(--danger);padding:5px 10px;border-radius:5px;cursor:pointer">🗑️</button></td>
    </tr>`).join('')}
  </table>`;
  updatePurchTotals();
}

function removePurchCartItem(i){purchCart.splice(i,1);renderPurchCart();}

function addExistToPurchCart(){
  const name=document.getElementById('pu-prod-search').value.trim();
  const qty=parseInt(document.getElementById('pu-exist-qty').value)||1;
  const price=parseFloat(document.getElementById('pu-exist-price').value)||0;
  const sell=parseFloat(document.getElementById('pu-exist-sell').value)||0;
  if(!name){toast('اختر منتجاً','error');return;}
  if(qty<=0){toast('الكمية يجب أن تكون أكبر من صفر','error');return;}
  const prod=purchProds.find(p=>p.name===name);
  if(!prod){toast('المنتج غير موجود في القائمة','error');return;}
  const exist=purchCart.find(c=>c.id===prod.id&&!c.isNew);
  if(exist){exist.quantity+=qty;exist.total=exist.quantity*exist.cost_price;}
  else purchCart.push({id:prod.id,name:prod.name,category:prod.category,quantity:qty,cost_price:price||prod.cost_price,sell_price:sell||prod.selling_price,total:qty*(price||prod.cost_price),isNew:false});
  renderPurchCart();
  document.getElementById('pu-prod-search').value='';
  document.getElementById('pu-exist-qty').value='1';
  document.getElementById('pu-exist-price').value='0';
  document.getElementById('pu-exist-sell').value='0';
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  document.getElementById('pu-paid').value=total.toFixed(2);
  updatePurchTotals();
}

async function addNewToPurchCart(){
  const name=document.getElementById('pu-new-name').value.trim();
  const brand=document.getElementById('pu-new-brand').value.trim();
  const cat=document.getElementById('pu-new-cat').value;
  const cond=document.getElementById('pu-new-cond')?.value||'جديد';
  const qty=parseInt(document.getElementById('pu-new-qty').value)||1;
  const cost=parseFloat(document.getElementById('pu-new-cost').value)||0;
  const sell=parseFloat(document.getElementById('pu-new-sell').value)||0;
  const bar=document.getElementById('pu-new-bar').value.trim();
  if(!name||!brand){toast('اسم المنتج والماركة مطلوبان','error');return;}
  if(qty<=0){toast('الكمية يجب أن تكون أكبر من صفر','error');return;}
  const r=await api('/api/products/add','POST',{name,brand,model:'-',category:cat,cost_price:cost,selling_price:sell||cost,quantity:0,min_stock:5,barcode:bar||null,condition:cond});
  if(!r.success){toast(r.message,'error');return;}
  purchCart.push({id:r.data?.id||null,name,category:cat,quantity:qty,cost_price:cost,sell_price:sell,total:qty*cost,isNew:true,isJustCreated:true});
  renderPurchCart();
  document.getElementById('pu-new-name').value='';
  document.getElementById('pu-new-brand').value='';
  document.getElementById('pu-new-qty').value='1';
  document.getElementById('pu-new-cost').value='0';
  document.getElementById('pu-new-sell').value='0';
  document.getElementById('pu-new-bar').value='';
  const pr2=await api('/api/products');
  purchProds=pr2.data||[];
  document.getElementById('pu-prod-list').innerHTML=purchProds.map(p=>`<option value="${p.name}">${p.brand} | مخزون: ${p.quantity}</option>`).join('');
  toast('✅ تم إنشاء المنتج وإضافته');
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  document.getElementById('pu-paid').value=total.toFixed(2);
  updatePurchTotals();
}

async function savePurchNew(){
  if(!purchCart.length){toast('أضف منتجات أولاً','error');return;}
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  const paid=parseFloat(document.getElementById('pu-paid')?.value)||0;
  const supEl=document.getElementById('pu-sup');
  const supId=supEl&&supEl.value?parseInt(supEl.value):null;
  const items=purchCart.filter(item=>item.id).map(item=>({
    product_id:item.id,
    quantity:item.quantity,
    unit_price:item.cost_price||0,
    sell_price:item.sell_price||0
  }));
  if(!items.length){toast('تأكد من إضافة منتجات صحيحة','error');return;}
  const r=await api('/api/purchases/add','POST',{supplier_id:supId,paid_amount:paid,items});
  if(r.success){
    closePurchOverlay();
    toast(`✅ تم حفظ الفاتورة ${r.data?.invoice_number||''} | الإجمالي: ${fmt(total)}`);
    purchases('شهر');
  }else toast(r.message,'error');
}

function renderPurchasesTable(data){
  const tbl=document.getElementById('purchases-table');
  if(!data||!data.length){tbl.innerHTML=em('لا توجد مشتريات');return;}
  tbl.innerHTML=`<table style="width:100%">
    <tr><th>رقم الفاتورة</th><th>المورد</th><th>التاريخ</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th><th></th></tr>
    ${data.map(p=>`<tr>
      <td><b style="color:var(--accent)">${p.invoice_number}</b></td>
      <td>${p.supplier_name||'—'}</td>
      <td>${p.purchase_date}</td>
      <td>${fmt(p.total_amount)}</td>
      <td>${fmt(p.paid_amount)}</td>
      <td><span class="badge ${p.remaining_amount>0?'br':'bg'}">${fmt(p.remaining_amount)}</span></td>
      <td style="white-space:nowrap">
        <button class="btn btn-ghost btn-sm" onclick="vPurch(${p.id})" title="عرض التفاصيل">👁️</button>
        ${p.remaining_amount>0?`<button class="btn btn-warn btn-sm" onclick="payPurch(${p.id},${p.remaining_amount})">💳</button>`:''}
        <button class="btn btn-danger btn-sm" onclick="dPurch(${p.id})">🗑️</button>
      </td>
    </tr>`).join('')}
  </table>`;
}

function filterPurchasesTable(){
  const search=document.getElementById('purch-search').value.toLowerCase();
  const from=document.getElementById('purch-from').value;
  const to=document.getElementById('purch-to').value;
  const filtered=purchasesData.filter(p=>{
    const matchSearch=!search||p.invoice_number.toLowerCase().includes(search)||(p.supplier_name||'').toLowerCase().includes(search);
    const matchFrom=!from||p.purchase_date>=from;
    const matchTo=!to||p.purchase_date<=to;
    return matchSearch&&matchFrom&&matchTo;
  });
  renderPurchasesTable(filtered);
}

function purchasesPeriod(period){purchases(period);}

async function vPurch(id){
  const r=await api(`/api/purchases/${id}`);
  if(!r.success){toast('خطأ في تحميل البيانات','error');return;}
  const{purchase,details}=r.data;
  let html=`
  <div style="background:var(--bg3);padding:14px;border-radius:9px;margin-bottom:14px;border-left:4px solid var(--accent)">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:10px">
      <div><span style="color:var(--muted);font-size:11px">🧾 رقم الفاتورة</span><div style="font-weight:700;color:var(--accent);font-size:16px">${purchase.invoice_number}</div></div>
      <div><span style="color:var(--muted);font-size:11px">📅 التاريخ</span><div style="font-weight:600">${purchase.purchase_date}</div></div>
      <div><span style="color:var(--muted);font-size:11px">🏢 المورد</span><div style="font-weight:600">${purchase.supplier_name||'بدون مورد'}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;border-top:1px solid var(--border);padding-top:10px">
      <div style="padding:8px;background:rgba(0,212,255,.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">💰 الإجمالي</span><div style="font-weight:700;color:var(--accent);font-size:15px">${fmt(purchase.total_amount)}</div></div>
      <div style="padding:8px;background:rgba(0,255,157,.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">✅ المدفوع</span><div style="font-weight:700;color:var(--accent2);font-size:15px">${fmt(purchase.paid_amount)}</div></div>
      <div style="padding:8px;background:rgba(${purchase.remaining_amount>0?'255,71,87':'0,255,157'},.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">⏳ المتبقي</span><div style="font-weight:700;color:${purchase.remaining_amount>0?'var(--danger)':'var(--accent2)'};font-size:15px">${fmt(purchase.remaining_amount)}</div></div>
    </div>
  </div>
  <div style="background:var(--bg2);border:1px solid var(--border);border-radius:9px;overflow:hidden;margin-bottom:14px">
    <div style="padding:12px;background:var(--bg3);border-bottom:1px solid var(--border);font-weight:700;color:var(--accent)">📦 المنتجات (${details.length})</div>
    <table style="width:100%;margin:0">
      <tr style="background:var(--bg3)"><th style="padding:10px;text-align:right">🏷️ المنتج</th><th style="padding:10px">📊 الكمية</th><th style="padding:10px">💵 السعر</th><th style="padding:10px">🧮 الإجمالي</th></tr>
      ${details.map(d=>`<tr><td style="padding:10px;border-bottom:1px solid var(--border)"><b style="color:var(--accent)">${d.product_name}</b></td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center;color:var(--accent2);font-weight:700">${d.quantity}</td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center">${fmt(d.unit_price)}</td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center;color:var(--accent2);font-weight:700">${fmt(d.total_price)}</td></tr>`).join('')}
    </table>
  </div>`;
  omo(`📋 فاتورة شراء: ${purchase.invoice_number}`,html,
  `${purchase.remaining_amount>0?`<button class="btn btn-warn" onclick="payPurch(${id},${purchase.remaining_amount})">💳 دفعة</button>`:''}
  <button class="btn btn-danger" onclick="if(confirm('هل تريد حذف هذه الفاتورة؟')) dPurch(${id})">🗑️ حذف</button>
  <button class="btn btn-ghost" onclick="cmo()">✖️ إغلاق</button>`);
}

function payPurch(id,rem){
  omo('💳 تسجيل دفعة للمورد',`
  <div class="ff" style="margin-bottom:14px">
    <label style="color:var(--muted);font-size:12px">المبلغ المتبقي: <b style="color:var(--accent)">${fmt(rem)}</b></label>
    <input id="pay-purch-amount" type="number" value="${rem}" style="margin-top:6px;background:var(--bg3);border:1px solid var(--border);padding:10px;border-radius:7px;color:var(--text);width:100%">
  </div>`,
  `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="sbPayPurch(${id})">✅ تأكيد</button>`);
}
async function sbPayPurch(id){
  const amount=document.getElementById('pay-purch-amount').value;
  if(!amount||parseFloat(amount)<=0){toast('أدخل مبلغاً صحيحاً','error');return;}
  const r=await api(`/api/purchases/${id}/pay`,'POST',{amount,method:'نقدي'});
  if(r.success){cmo();toast('✅ '+r.message);purchases('شهر');}else toast(r.message,'error');
}
async function dPurch(id){
  if(!confirm('هل تريد حذف هذه الفاتورة؟'))return;
  const r=await api(`/api/purchases/${id}`,'DELETE');
  if(r.success){toast('✅ تم الحذف');purchases('شهر');}else toast(r.message,'error');
}

function quickAddSupplierInline(){
  const div=document.createElement('div');
  div.id='quick-sup-popup';
  div.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:400;display:flex;align-items:center;justify-content:center';
  div.innerHTML=`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:24px;width:400px;max-width:95vw">
    <h3 style="margin:0 0 16px;color:var(--accent)">➕ إضافة مورد جديد</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
      <div><label style="font-size:12px;color:var(--muted)">الاسم *</label><input id="qsn" style="width:100%;margin-top:5px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px"></div>
      <div><label style="font-size:12px;color:var(--muted)">الهاتف</label><input id="qsp" style="width:100%;margin-top:5px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 10px;color:var(--text);font-size:14px"></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px">
      <button onclick="document.getElementById('quick-sup-popup').remove()" style="padding:9px 18px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;color:var(--text);cursor:pointer;font-family:Cairo,sans-serif">إلغاء</button>
      <button onclick="saveQuickSupplier()" style="padding:9px 20px;background:var(--accent2);color:#0f1923;border:none;border-radius:7px;font-weight:700;cursor:pointer;font-family:Cairo,sans-serif">💾 حفظ</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  setTimeout(()=>document.getElementById('qsn')?.focus(),100);
}

async function saveQuickSupplier(){
  const name=document.getElementById('qsn')?.value.trim();
  const phone=document.getElementById('qsp')?.value.trim()||'';
  if(!name){toast('أدخل اسم المورد','error');return;}
  const r=await api('/api/suppliers/add','POST',{name,phone,email:'',address:''});
  if(r.success){
    document.getElementById('quick-sup-popup')?.remove();
    toast('✅ تم إضافة المورد');
    // refresh supplier dropdown
    const sr=await api('/api/suppliers');
    purchSups=sr.data||[];
    const sel=document.getElementById('pu-sup');
    if(sel){
      const cur=sel.value;
      sel.innerHTML=`<option value="">— بدون مورد —</option>${purchSups.map(s=>`<option value="${s.id}">${s.name}${s.phone?' ('+s.phone+')':''}</option>`).join('')}`;
      // select newly added
      if(r.data?.id) sel.value=r.data.id;
      else sel.value=cur;
    }
  }else toast(r.message,'error');
}

function closePurchOverlay(){document.getElementById('purch-overlay')?.remove();}

function switchPurchTab(tab){
  const isExist=tab==='exist';
  document.getElementById('purch-tab-exist').style.display=isExist?'block':'none';
  document.getElementById('purch-tab-new').style.display=isExist?'none':'block';
  document.getElementById('tab-exist').style.cssText=`padding:9px 20px;border:none;border-bottom:3px solid ${isExist?'var(--accent)':'transparent'};background:${isExist?'rgba(0,212,255,.08)':'none'};color:${isExist?'var(--accent)':'var(--muted)'};font-family:Cairo,sans-serif;font-size:14px;font-weight:${isExist?700:600};cursor:pointer;border-radius:8px 8px 0 0`;
  document.getElementById('tab-new').style.cssText=`padding:9px 20px;border:none;border-bottom:3px solid ${!isExist?'var(--accent)':'transparent'};background:${!isExist?'rgba(0,212,255,.08)':'none'};color:${!isExist?'var(--accent)':'var(--muted)'};font-family:Cairo,sans-serif;font-size:14px;font-weight:${!isExist?700:600};cursor:pointer;border-radius:8px 8px 0 0`;
}

function togglePurchCondition(){
  const cat=document.getElementById('pu-new-cat')?.value;
  const wrap=document.getElementById('pu-cond-wrap');
  if(wrap) wrap.style.display=cat==='موبايلات'?'block':'none';
}

function updatePurchTotals(){
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  const paid=parseFloat(document.getElementById('pu-paid')?.value)||0;
  const rem=document.getElementById('pu-remaining');
  if(rem) rem.textContent=fmt(Math.max(0,total-paid));
  if(rem) rem.style.color=total-paid>0?'var(--warn)':'var(--accent2)';
  const el=document.getElementById('pu-total');
  if(el) el.textContent=fmt(total);
}

function renderPurchCart(){
  const el=document.getElementById('pu-cart-table');
  if(!el)return;
  const cnt=document.getElementById('pu-cart-cnt');
  if(cnt) cnt.textContent=purchCart.length+' منتج';
  if(!purchCart.length){
    el.innerHTML=`<div style="text-align:center;padding:28px;color:var(--muted)">📭 لم تُضف أي منتجات بعد</div>`;
    updatePurchTotals();return;
  }
  el.innerHTML=`<table style="width:100%;border-collapse:collapse">
    <tr style="background:var(--bg3)"><th style="padding:9px 12px;text-align:right;font-size:12px;color:var(--muted)">المنتج</th><th style="padding:9px;font-size:12px;color:var(--muted)">الكمية</th><th style="padding:9px;font-size:12px;color:var(--muted)">سعر الشراء</th><th style="padding:9px;font-size:12px;color:var(--muted)">سعر البيع</th><th style="padding:9px;font-size:12px;color:var(--muted)">المجموع</th><th style="padding:9px"></th></tr>
    ${purchCart.map((item,i)=>`<tr style="border-bottom:1px solid var(--border)">
      <td style="padding:10px 12px"><b>${item.name}</b><br><span style="font-size:11px;color:var(--muted)">${item.isNew?'🆕 منتج جديد':'📦 موجود'} | ${item.category||''}</span></td>
      <td style="padding:10px;text-align:center">${item.quantity}</td>
      <td style="padding:10px;text-align:center;color:var(--accent)">${fmt(item.cost_price)}</td>
      <td style="padding:10px;text-align:center;color:var(--accent2)">${fmt(item.sell_price||0)}</td>
      <td style="padding:10px;text-align:center;font-weight:700">${fmt(item.total)}</td>
      <td style="padding:10px"><button onclick="removePurchCartItem(${i})" style="background:rgba(255,71,87,.15);border:none;color:var(--danger);padding:5px 10px;border-radius:5px;cursor:pointer">🗑️</button></td>
    </tr>`).join('')}
  </table>`;
  updatePurchTotals();
}

function removePurchCartItem(i){purchCart.splice(i,1);renderPurchCart();}

function addExistToPurchCart(){
  const name=document.getElementById('pu-prod-search').value.trim();
  const qty=parseInt(document.getElementById('pu-exist-qty').value)||1;
  const price=parseFloat(document.getElementById('pu-exist-price').value)||0;
  const sell=parseFloat(document.getElementById('pu-exist-sell').value)||0;
  if(!name){toast('اختر منتجاً','error');return;}
  if(qty<=0){toast('الكمية يجب أن تكون أكبر من صفر','error');return;}
  const prod=purchProds.find(p=>p.name===name);
  if(!prod){toast('المنتج غير موجود في القائمة','error');return;}
  const exist=purchCart.find(c=>c.id===prod.id&&!c.isNew);
  if(exist){exist.quantity+=qty;exist.total=exist.quantity*exist.cost_price;}
  else purchCart.push({id:prod.id,name:prod.name,category:prod.category,quantity:qty,cost_price:price||prod.cost_price,sell_price:sell||prod.selling_price,total:qty*(price||prod.cost_price),isNew:false});
  renderPurchCart();
  document.getElementById('pu-prod-search').value='';
  document.getElementById('pu-exist-qty').value='1';
  document.getElementById('pu-exist-price').value='0';
  document.getElementById('pu-exist-sell').value='0';
  // auto-fill paid
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  document.getElementById('pu-paid').value=total.toFixed(2);
  updatePurchTotals();
}

async function addNewToPurchCart(){
  const name=document.getElementById('pu-new-name').value.trim();
  const brand=document.getElementById('pu-new-brand').value.trim();
  const cat=document.getElementById('pu-new-cat').value;
  const cond=document.getElementById('pu-new-cond')?.value||'جديد';
  const qty=parseInt(document.getElementById('pu-new-qty').value)||1;
  const cost=parseFloat(document.getElementById('pu-new-cost').value)||0;
  const sell=parseFloat(document.getElementById('pu-new-sell').value)||0;
  const bar=document.getElementById('pu-new-bar').value.trim();
  if(!name||!brand){toast('اسم المنتج والماركة مطلوبان','error');return;}
  if(qty<=0){toast('الكمية يجب أن تكون أكبر من صفر','error');return;}
  // create product in DB
  const r=await api('/api/products/add','POST',{name,brand,model:'-',category:cat,cost_price:cost,selling_price:sell||cost,quantity:0,min_stock:5,barcode:bar||null,condition:cond});
  if(!r.success){toast(r.message,'error');return;}
  purchCart.push({id:r.data?.id||null,name,category:cat,quantity:qty,cost_price:cost,sell_price:sell,total:qty*cost,isNew:true,isJustCreated:true});
  renderPurchCart();
  document.getElementById('pu-new-name').value='';
  document.getElementById('pu-new-brand').value='';
  document.getElementById('pu-new-qty').value='1';
  document.getElementById('pu-new-cost').value='0';
  document.getElementById('pu-new-sell').value='0';
  document.getElementById('pu-new-bar').value='';
  // reload products list
  const pr2=await api('/api/products');
  purchProds=pr2.data||[];
  document.getElementById('pu-prod-list').innerHTML=purchProds.map(p=>`<option value="${p.name}">${p.brand} | مخزون: ${p.quantity}</option>`).join('');
  toast('✅ تم إنشاء المنتج وإضافته');
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  document.getElementById('pu-paid').value=total.toFixed(2);
  updatePurchTotals();
}

async function savePurchNew(){
  if(!purchCart.length){toast('أضف منتجات أولاً','error');return;}
  const total=purchCart.reduce((s,i)=>s+i.total,0);
  const paid=parseFloat(document.getElementById('pu-paid')?.value)||0;
  const supEl=document.getElementById('pu-sup');
  const supId=supEl&&supEl.value?parseInt(supEl.value):null;
  const items=purchCart.filter(item=>item.id).map(item=>({
    product_id:item.id,
    quantity:item.quantity,
    unit_price:item.cost_price||0,
    sell_price:item.sell_price||0
  }));
  if(!items.length){toast('تأكد من إضافة منتجات صحيحة','error');return;}
  const r=await api('/api/purchases/add','POST',{supplier_id:supId,paid_amount:paid,items});
  if(r.success){
    closePurchOverlay();
    toast(`✅ تم حفظ الفاتورة ${r.data?.invoice_number||''} | الإجمالي: ${fmt(total)}`);
    purchases('شهر');
  }else toast(r.message,'error');
}

function renderPurchasesTable(data){
  const tbl=document.getElementById('purchases-table');
  if(!data||!data.length){tbl.innerHTML=em('لا توجد مشتريات');return;}
  tbl.innerHTML=`<table style="width:100%">
    <tr><th>رقم الفاتورة</th><th>المورد</th><th>التاريخ</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th><th></th></tr>
    ${data.map(p=>`<tr>
      <td><b style="color:var(--accent)">${p.invoice_number}</b></td>
      <td>${p.supplier_name||'—'}</td>
      <td>${p.purchase_date}</td>
      <td>${fmt(p.total_amount)}</td>
      <td>${fmt(p.paid_amount)}</td>
      <td><span class="badge ${p.remaining_amount>0?'br':'bg'}">${fmt(p.remaining_amount)}</span></td>
      <td style="white-space:nowrap">
        <button class="btn btn-ghost btn-sm" onclick="vPurch(${p.id})" title="عرض التفاصيل">👁️</button>
        ${p.remaining_amount>0?`<button class="btn btn-warn btn-sm" onclick="payPurch(${p.id},${p.remaining_amount})">💳</button>`:''}
        <button class="btn btn-danger btn-sm" onclick="dPurch(${p.id})">🗑️</button>
      </td>
    </tr>`).join('')}
  </table>`;
}

function filterPurchasesTable(){
  const search=document.getElementById('purch-search').value.toLowerCase();
  const from=document.getElementById('purch-from').value;
  const to=document.getElementById('purch-to').value;
  const filtered=purchasesData.filter(p=>{
    const matchSearch=!search||p.invoice_number.toLowerCase().includes(search)||(p.supplier_name||'').toLowerCase().includes(search);
    const matchFrom=!from||p.purchase_date>=from;
    const matchTo=!to||p.purchase_date<=to;
    return matchSearch&&matchFrom&&matchTo;
  });
  renderPurchasesTable(filtered);
}

function purchasesPeriod(period){purchases(period);}

async function vPurch(id){
  const r=await api(`/api/purchases/${id}`);
  if(!r.success){toast('خطأ في تحميل البيانات','error');return;}
  const purchase=r.data;
  let html=`
  <div style="background:var(--bg3);padding:14px;border-radius:9px;margin-bottom:14px;border-left:4px solid var(--accent)">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:10px">
      <div><span style="color:var(--muted);font-size:11px">🧾 رقم الفاتورة</span><div style="font-weight:700;color:var(--accent);font-size:16px">${purchase.invoice_number}</div></div>
      <div><span style="color:var(--muted);font-size:11px">📅 التاريخ</span><div style="font-weight:600">${purchase.purchase_date}</div></div>
      <div><span style="color:var(--muted);font-size:11px">🏢 المورد</span><div style="font-weight:600">${purchase.supplier_name||'بدون مورد'}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;border-top:1px solid var(--border);padding-top:10px">
      <div style="padding:8px;background:rgba(0,212,255,.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">💰 الإجمالي</span><div style="font-weight:700;color:var(--accent);font-size:15px">${fmt(purchase.total_amount)}</div></div>
      <div style="padding:8px;background:rgba(0,255,157,.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">✅ المدفوع</span><div style="font-weight:700;color:var(--accent2);font-size:15px">${fmt(purchase.paid_amount)}</div></div>
      <div style="padding:8px;background:rgba(${purchase.remaining_amount>0?'255,71,87':'0,255,157'},.1);border-radius:5px"><span style="color:var(--muted);font-size:10px">⏳ المتبقي</span><div style="font-weight:700;color:${purchase.remaining_amount>0?'var(--danger)':'var(--accent2)'};font-size:15px">${fmt(purchase.remaining_amount)}</div></div>
    </div>
  </div>
  <div style="background:var(--bg2);border:1px solid var(--border);border-radius:9px;overflow:hidden;margin-bottom:14px">
    <div style="padding:12px;background:var(--bg3);border-bottom:1px solid var(--border);font-weight:700;color:var(--accent)">📦 المنتجات (${purchase.items?.length||0})</div>
    <table style="width:100%;margin:0">
      <tr style="background:var(--bg3)"><th style="padding:10px;text-align:right">🏷️ المنتج</th><th style="padding:10px">📊 الكمية</th><th style="padding:10px">💵 السعر</th><th style="padding:10px">🧮 الإجمالي</th></tr>
      ${purchase.items?.map(d=>{const product=DB.products.find(p=>p.id===d.product_id);return`<tr><td style="padding:10px;border-bottom:1px solid var(--border)"><b style="color:var(--accent)">${product?.name||'منتج محذوف'}</b></td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center;color:var(--accent2);font-weight:700">${d.quantity}</td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center">${fmt(d.unit_price)}</td><td style="padding:10px;border-bottom:1px solid var(--border);text-align:center;color:var(--accent2);font-weight:700">${fmt(d.quantity*d.unit_price)}</td></tr>`;}).join('')||'<tr><td colspan="4" style="padding:20px;text-align:center;color:var(--muted)">لا توجد منتجات</td></tr>'}
    </table>
  </div>`;
  omo(`📋 فاتورة شراء: ${purchase.invoice_number}`,html,
  `${purchase.remaining_amount>0?`<button class="btn btn-warn" onclick="payPurch(${id},${purchase.remaining_amount})">💳 دفعة</button>`:''}
  <button class="btn btn-danger" onclick="if(confirm('هل تريد حذف هذه الفاتورة؟')) dPurch(${id})">🗑️ حذف</button>
  <button class="btn btn-ghost" onclick="cmo()">✖️ إغلاق</button>`);
}

function payPurch(id,rem){
  omo('💳 تسجيل دفعة للمورد',`
  <div class="ff" style="margin-bottom:14px">
    <label style="color:var(--muted);font-size:12px">المبلغ المتبقي: <b style="color:var(--accent)">${fmt(rem)}</b></label>
    <input id="pay-purch-amount" type="number" value="${rem}" style="margin-top:6px;background:var(--bg3);border:1px solid var(--border);padding:10px;border-radius:7px;color:var(--text);width:100%">
  </div>`,
  `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="sbPayPurch(${id})">✅ تأكيد</button>`);
}
async function sbPayPurch(id){
  const amount=document.getElementById('pay-purch-amount').value;
  if(!amount||parseFloat(amount)<=0){toast('أدخل مبلغاً صحيحاً','error');return;}
  const r=await api(`/api/purchases/${id}/pay`,'POST',{amount,method:'نقدي'});
  if(r.success){cmo();toast('✅ '+r.message);purchases('شهر');}else toast(r.message,'error');
}
async function dPurch(id){
  if(!confirm('هل تريد حذف هذه الفاتورة؟'))return;
  const r=await api(`/api/purchases/${id}`,'DELETE');
  if(r.success){toast('✅ تم الحذف');purchases('شهر');}else toast(r.message,'error');
}

// ═══════════════════════════════════════════════════════════
//  SUPPLIERS
// ═══════════════════════════════════════════════════════════
async function suppliers(){
  const c=document.getElementById('pc');
  c.innerHTML=`<div style="display:flex;justify-content:flex-end;margin-bottom:14px"><button class="btn btn-success" onclick="addSup()">+ إضافة مورد</button></div>
  <div class="tw"><div class="th"><h3>🚚 الموردين</h3></div><div id="supt">${ld()}</div></div>`;
  const r=await api('/api/suppliers');
  document.getElementById('supt').innerHTML=r.data?.length
    ?`<table><tr><th>الاسم</th><th>الهاتف</th><th>البريد</th><th>العنوان</th><th></th></tr>
    ${r.data.map(s=>`<tr><td><b>${s.name}</b></td><td>${s.phone}</td><td>${s.email||'—'}</td><td>${s.address||'—'}</td>
    <td><button class="btn btn-ghost btn-sm" onclick='eSup(${JSON.stringify(s)})'>✏️</button> <button class="btn btn-danger btn-sm" onclick="dSup(${s.id})">🗑️</button></td></tr>`).join('')}</table>`:em();
}
function addSup(){omo('➕ مورد جديد',`<div class="fg"><div class="ff"><label>الاسم *</label><input id="sn"></div><div class="ff"><label>الهاتف *</label><input id="sph"></div><div class="ff"><label>البريد</label><input id="se"></div><div class="ff"><label>العنوان</label><input id="sa"></div></div>`,`<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="svSup()">💾 حفظ</button>`);}
async function svSup(){const r=await api('/api/suppliers/add','POST',{name:document.getElementById('sn').value,phone:document.getElementById('sph').value,email:document.getElementById('se').value,address:document.getElementById('sa').value});if(r.success){cmo();toast(r.message);suppliers();}else toast(r.message,'error');}
function eSup(s){omo('✏️ تعديل مورد',`<div class="fg"><div class="ff"><label>الاسم</label><input id="esn" value="${s.name}"></div><div class="ff"><label>الهاتف</label><input id="esp" value="${s.phone}"></div><div class="ff"><label>البريد</label><input id="ese" value="${s.email||''}"></div><div class="ff"><label>العنوان</label><input id="esa" value="${s.address||''}"></div></div>`,`<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="upSup(${s.id})">💾 حفظ</button>`);}
async function upSup(id){const r=await api(`/api/suppliers/${id}`,'PUT',{name:document.getElementById('esn').value,phone:document.getElementById('esp').value,email:document.getElementById('ese').value,address:document.getElementById('esa').value});if(r.success){cmo();toast(r.message);suppliers();}else toast(r.message,'error');}
async function dSup(id){if(!confirm('حذف؟'))return;const r=await api(`/api/suppliers/${id}`,'DELETE');if(r.success){toast(r.message);suppliers();}else toast(r.message,'error');}

function customers() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw"><div class="th"><h3>العملاء</h3></div><div style="padding:20px">✅ قسم العملاء - جاهز للاستخدام</div></div>`;
}

// ═══════════════════════════════════════════════════════════
//  MAINTENANCE
// ═══════════════════════════════════════════════════════════
async function maintenance(sf='',sq=''){
  const c=document.getElementById('pc');
  c.innerHTML=`
  <div style="display:flex;gap:20px;align-items:flex-start">
    <!-- الجانب الرئيسي -->
    <div style="flex:1;min-width:0">
      <!-- شريط الأدوات -->
      <div style="display:flex;gap:7px;margin-bottom:14px;flex-wrap:wrap;align-items:center">
        ${['','قيد الإصلاح','جاهز','تم التسليم'].map(s=>`<button class="btn ${s===sf?'btn-success':'btn-ghost'} btn-sm" onclick="maintenance('${s}',document.getElementById('mq-search')?.value||'')">${s||'الكل'}</button>`).join('')}
        <input class="si" id="mq-search" placeholder="🔍 بحث عن عميل أو جهاز..." value="${sq}" oninput="maintenance('${sf}',this.value)" style="flex:1;min-width:180px">
        <button class="btn btn-success btn-sm" onclick="addMaint()">+ طلب صيانة</button>
        <button class="btn btn-danger btn-sm" onclick="clearAllMaint()">🗑️ حذف الكل</button>
      </div>
      <div class="tw"><div class="th"><h3>🔧 طلبات الصيانة</h3><span id="maint-cnt" style="color:var(--muted);font-size:13px"></span></div><div id="mt">${ld()}</div></div>
    </div>
    <!-- اللوحة الجانبية -->
    <div style="width:220px;flex-shrink:0;display:flex;flex-direction:column;gap:12px">
      <div class="sc gr" style="padding:18px">
        <div class="lb">💰 إجمالي السعر</div>
        <div class="vl" id="maint-total-price">0</div>
        <div class="sb">المبالغ المطلوبة</div>
      </div>
      <div class="sc pu" style="padding:18px">
        <div class="lb">💹 إجمالي الربح</div>
        <div class="vl" id="maint-total-profit">0</div>
        <div class="sb">ربح بعد التكاليف</div>
      </div>
      <div class="sc bl" style="padding:18px">
        <div class="lb">📋 عدد الطلبات</div>
        <div class="vl" id="maint-count-box">0</div>
      </div>
    </div>
  </div>`;

  const r=await api(`/api/maintenance${sf?'?status='+encodeURIComponent(sf):''}`);
  let data=r.data||[];

  // فلتر البحث
  if(sq){
    const qs=sq.toLowerCase();
    data=data.filter(m=>m.customer_name.toLowerCase().includes(qs)||m.device_model.toLowerCase().includes(qs)||m.phone.includes(qs));
  }

  // حساب الإجماليات
  let totalPrice=0,totalProfit=0;
  data.forEach(m=>{totalPrice+=(m.selling_price||0);totalProfit+=((m.selling_price||0)-(m.cost||0));});
  document.getElementById('maint-total-price').textContent=fmt(totalPrice);
  document.getElementById('maint-total-profit').textContent=fmt(totalProfit);
  document.getElementById('maint-count-box').textContent=data.length;
  document.getElementById('maint-cnt').textContent=data.length+' طلب';

  document.getElementById('mt').innerHTML=data.length
    ?`<div style="overflow-x:auto"><table style="width:100%"><tr><th>العميل</th><th>الهاتف</th><th>الجهاز</th><th>المشكلة</th><th>التكلفة</th><th>السعر الإجمالي</th><th>الربح</th><th>الحالة</th><th>تاريخ الاستلام</th><th></th></tr>
    ${data.map(m=>{const profit=(m.selling_price||0)-(m.cost||0);return`<tr>
    <td><b>${m.customer_name}</b></td><td>${m.phone}</td><td>${m.device_model}</td>
    <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${m.problem_description||''}">${m.problem_description||'—'}</td>
    <td>${fmt(m.cost)}</td>
    <td style="color:var(--accent2);font-weight:700">${fmt(m.selling_price||0)}</td>
    <td style="color:${profit>=0?'var(--accent2)':'var(--danger)'}">${profit>=0?'+':''}${fmt(profit)}</td>
    <td><span class="badge ${m.status==='جاهز'?'bg':m.status==='تم التسليم'?'bb':'bw'}">${m.status}</span></td>
    <td style="font-size:11px;color:var(--muted)">${m.received_date||'—'}</td>
    <td style="white-space:nowrap">
      <button class="btn btn-ghost btn-sm" title="تفاصيل" onclick='vMaint(${JSON.stringify(m)})'>👁️</button>
      <button class="btn btn-ghost btn-sm" onclick='upMaint(${JSON.stringify(m)})'>✏️</button>
      <button class="btn btn-danger btn-sm" onclick="dMaint(${m.id})">🗑️</button>
    </td></tr>`;}).join('')}</table></div>`
    :em('لا توجد طلبات صيانة');
}

function vMaint(m){
  const profit=(m.selling_price||0)-(m.cost||0);
  const html=`
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">العميل</div>
      <div style="font-weight:700;font-size:15px">${m.customer_name}</div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">الهاتف</div>
      <div style="font-weight:600">${m.phone}</div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">الجهاز</div>
      <div style="font-weight:700;color:var(--accent)">${m.device_model}</div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">الحالة</div>
      <div><span class="badge ${m.status==='جاهز'?'bg':m.status==='تم التسليم'?'bb':'bw'}">${m.status}</span></div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px;grid-column:1/-1">
      <div style="font-size:11px;color:var(--muted);margin-bottom:5px">المشكلة</div>
      <div style="line-height:1.6">${m.problem_description||'لا يوجد وصف'}</div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">تاريخ الاستلام</div>
      <div>${m.received_date||'—'} ${m.received_time||''}</div>
    </div>
    <div style="background:var(--bg3);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--muted)">تاريخ التسليم</div>
      <div>${m.delivery_date||'لم يُسلَّم بعد'}</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
    <div style="background:rgba(0,212,255,.1);border:1px solid var(--accent);border-radius:9px;padding:14px;text-align:center">
      <div style="font-size:11px;color:var(--muted)">التكلفة</div>
      <div style="font-size:20px;font-weight:900;color:var(--accent)">${fmt(m.cost)}</div>
    </div>
    <div style="background:rgba(0,255,157,.1);border:1px solid var(--accent2);border-radius:9px;padding:14px;text-align:center">
      <div style="font-size:11px;color:var(--muted)">السعر الإجمالي</div>
      <div style="font-size:20px;font-weight:900;color:var(--accent2)">${fmt(m.selling_price||0)}</div>
    </div>
    <div style="background:rgba(168,85,247,.1);border:1px solid #a855f7;border-radius:9px;padding:14px;text-align:center">
      <div style="font-size:11px;color:var(--muted)">الربح</div>
      <div style="font-size:20px;font-weight:900;color:${profit>=0?'#a855f7':'var(--danger)'}">${profit>=0?'+':''}${fmt(profit)}</div>
    </div>
  </div>`;
  omo(`📋 تفاصيل طلب صيانة`,html,
  `<button class="btn btn-warn btn-sm" onclick="cmo();upMaint(${JSON.stringify(m).replace(/"/g,'&quot;')})">✏️ تعديل</button>
   <button class="btn btn-ghost" onclick="cmo()">✖ إغلاق</button>`);
}

function clearAllMaint(){
  omo('🗑️ حذف جميع طلبات الصيانة',`
  <div style="background:rgba(255,71,87,.1);border:1px solid var(--danger);border-radius:8px;padding:16px;color:var(--danger)">
    <b>⚠️ تحذير:</b> سيتم حذف جميع طلبات الصيانة نهائياً ولا يمكن التراجع عن هذا الإجراء.
  </div>`,
  `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-danger" onclick="confirmClearAllMaint()">🗑️ حذف الكل</button>`);
}
async function confirmClearAllMaint(){
  const r=await api('/api/maintenance/clear','POST',{});
  if(r.success){cmo();toast('✅ تم حذف جميع طلبات الصيانة');maintenance();}else toast(r.message,'error');
}
function addMaint(){omo('➕ طلب صيانة',`<div class="fg"><div class="ff"><label>العميل *</label><input id="mc"></div><div class="ff"><label>الهاتف *</label><input id="mph"></div><div class="ff full"><label>الجهاز *</label><input id="md"></div><div class="ff full"><label>المشكلة</label><textarea id="mp"></textarea></div><div class="ff"><label>التكلفة (تكلفة الإصلاح)</label><input id="mcost" type="number" value="0" oninput="autoMaintPrice()"></div><div class="ff"><label>السعر الإجمالي (للعميل)</label><input id="msp" type="number" value="0" placeholder="السعر المطلوب من العميل"></div></div><div style="background:rgba(0,212,255,.08);border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px;font-size:12px;color:var(--muted)">💡 التكلفة = تكلفة قطع الغيار والعمالة | السعر الإجمالي = السعر المطلوب من العميل</div>`,`<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="svMaint()">💾 حفظ</button>`);}
function autoMaintPrice(){const c=parseFloat(document.getElementById('mcost')?.value)||0;const sp=document.getElementById('msp');if(sp&&(parseFloat(sp.value)||0)===0)sp.value=c;}
async function svMaint(){const r=await api('/api/maintenance/add','POST',{customer_name:document.getElementById('mc').value,phone:document.getElementById('mph').value,device_model:document.getElementById('md').value,problem_description:document.getElementById('mp').value,cost:document.getElementById('mcost').value,selling_price:document.getElementById('msp').value||0,received_time:new Date().toTimeString().slice(0,5)});if(r.success){cmo();toast(r.message);maintenance();}else toast(r.message,'error');}
function upMaint(m){omo('✏️ تحديث',`<div class="fg"><div class="ff full"><label>الحالة</label><select id="ums"><option ${m.status==='قيد الإصلاح'?'selected':''}>قيد الإصلاح</option><option ${m.status==='جاهز'?'selected':''}>جاهز</option><option ${m.status==='تم التسليم'?'selected':''}>تم التسليم</option></select></div><div class="ff"><label>التكلفة</label><input id="umc" type="number" value="${m.cost}" oninput="autoMaintPriceUp()"></div><div class="ff"><label>السعر الإجمالي (للعميل)</label><input id="umsp" type="number" value="${m.selling_price||m.cost||0}"></div></div>`,`<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="sbUpMaint(${m.id})">💾 حفظ</button>`);}
function autoMaintPriceUp(){const c=parseFloat(document.getElementById('umc')?.value)||0;const sp=document.getElementById('umsp');if(sp&&(parseFloat(sp.value)||0)===0)sp.value=c;}
async function sbUpMaint(id){const r=await api(`/api/maintenance/${id}`,'PUT',{status:document.getElementById('ums').value,cost:document.getElementById('umc').value,selling_price:document.getElementById('umsp')?.value||0});if(r.success){cmo();toast(r.message);maintenance();}else toast(r.message,'error');}
async function dMaint(id){if(!confirm('حذف؟'))return;const r=await api(`/api/maintenance/${id}`,'DELETE');if(r.success){toast(r.message);maintenance();}else toast(r.message,'error');}

function reports() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw"><div class="th"><h3>📈 التقارير</h3></div><div style="padding:20px">✅ قسم التقارير - جاهز للاستخدام</div></div>`;
}

function currency() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div style="max-width:720px">
      <div class="tw" style="padding:18px;margin-bottom:18px">
        <h3 style="margin-bottom:14px;color:var(--accent)">⚙️ أسعار الصرف</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="background:var(--bg3);border-radius:8px;padding:13px"><label style="font-size:11px;color:var(--muted)">🇸🇾 سوري (شراء)</label><input class="rin" id="r1" value="${rates.syp_buy}" oninput="svRates();calcCur()" style="margin-top:6px"></div>
          <div style="background:var(--bg3);border-radius:8px;padding:13px"><label style="font-size:11px;color:var(--muted)">🇸🇾 سوري (بيع)</label><input class="rin" id="r2" value="${rates.syp_sell}" oninput="svRates();calcCur()" style="margin-top:6px"></div>
          <div style="background:var(--bg3);border-radius:8px;padding:13px"><label style="font-size:11px;color:var(--muted)">🇹🇷 تركي (شراء)</label><input class="rin" id="r3" value="${rates.try_buy}" oninput="svRates();calcCur()" style="margin-top:6px"></div>
          <div style="background:var(--bg3);border-radius:8px;padding:13px"><label style="font-size:11px;color:var(--muted)">🇹🇷 تركي (بيع)</label><input class="rin" id="r4" value="${rates.try_sell}" oninput="svRates();calcCur()" style="margin-top:6px"></div>
        </div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(0,255,157,.08);border-radius:7px;font-size:12px;color:var(--accent2)">✅ تُحفظ تلقائياً ولا تتغير حتى تعدلها</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
        ${[['🇺🇸 دولار','usd','var(--accent)'],['🇸🇾 سوري','syp','var(--accent2)'],['🇹🇷 تركي','try','var(--warn)']].map(([lbl,id,cl])=>`
        <div class="tw" style="padding:14px">
          <h4 style="margin-bottom:11px;color:${cl}">${lbl} ←</h4>
          <input class="rin" id="${id}-in" type="number" placeholder="أدخل مبلغ..." oninput="calcCur()" style="margin-bottom:11px">
          <div id="${id}-res"></div>
        </div>`).join('')}
      </div>
    </div>`;
}

let svT;
function svRates(){rates.syp_buy=parseFloat(document.getElementById('r1').value)||14800;rates.syp_sell=parseFloat(document.getElementById('r2').value)||15000;rates.try_buy=parseFloat(document.getElementById('r3').value)||29.5;rates.try_sell=parseFloat(document.getElementById('r4').value)||30.5;clearTimeout(svT);svT=setTimeout(()=>api('/api/currency/rates','POST',rates),900);}
function nv(id){return parseFloat(document.getElementById(id)?.value)||0;}
function resBox(label,value,color='var(--accent2)'){return`<div style="background:var(--bg3);border-radius:7px;padding:11px;margin-bottom:8px"><span style="font-size:11px;color:var(--muted)">${label}</span><div style="font-size:19px;font-weight:900;color:${color}">${fmt(value)}</div></div>`;}
function calcCur(){
  const{syp_buy:sb,syp_sell:ss,try_buy:tb,try_sell:ts}=rates;
  const usd=nv('usd-in'),syp=nv('syp-in'),tryv=nv('try-in');
  const ur=document.getElementById('usd-res'),sr=document.getElementById('syp-res'),tr=document.getElementById('try-res');
  if(ur&&usd){ur.innerHTML=resBox('سوري (شراء)',usd*sb)+resBox('سوري (بيع)',usd*ss,'var(--danger)')+resBox('تركي (شراء)',usd*tb)+resBox('تركي (بيع)',usd*ts,'var(--danger)');}
  if(sr&&syp){sr.innerHTML=resBox('دولار (شراء)',ss>0?syp/ss:0)+resBox('دولار (بيع)',sb>0?syp/sb:0,'var(--danger)')+resBox('تركي (شراء)',ts>0?syp/ts:0)+resBox('تركي (بيع)',tb>0?syp/tb:0,'var(--danger)');}
  if(tr&&tryv){tr.innerHTML=resBox('دولار (شراء)',ts>0?tryv/ts:0)+resBox('دولار (بيع)',tb>0?tryv/tb:0,'var(--danger)')+resBox('سوري (شراء)',tryv*(ss>0?sb/ts:0))+resBox('سوري (بيع)',tryv*(tb>0?ss/tb:0),'var(--danger)');}
}

// أسعار الصرف الافتراضية
let rates = {
  syp_buy: 14800,
  syp_sell: 15000,
  try_buy: 29.5,
  try_sell: 30.5
};

// تحميل أسعار الصرف من LocalStorage
const savedRates = localStorage.getItem('rates');
if (savedRates) {
  try {
    rates = JSON.parse(savedRates);
  } catch (e) {
    console.error('Error loading rates:', e);
  }
}

function barcode_sale() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw">
      <div class="th"><h3>📦 بيع بالباركود</h3></div>
      <div style="padding:20px">
        <div class="fg" style="margin-bottom:20px">
          <div class="ff full"><label>ماسح الرمز (أو ابحث عن المنتج)</label>
            <input id="barcode-input" placeholder="امسح الباركود أو ابحث..." autofocus style="font-size:16px;padding:10px;border:2px solid var(--accent);border-radius:8px">
          </div>
        </div>
        <div id="sale-cart"></div>
        <div style="margin-top:20px;padding:20px;background:var(--bg3);border-radius:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:10px">
            <span>الإجمالي:</span>
            <span id="total-amount" style="font-size:18px;font-weight:bold;color:var(--accent)">0</span>
          </div>
          <button class="btn btn-success" style="width:100%;margin-bottom:10px" onclick="completeSale()">✅ إتمام البيع</button>
          <button class="btn btn-ghost" style="width:100%" onclick="clearCart()">🗑️ مسح السلة</button>
        </div>
      </div>
    </div>`;

    let cart = [];
    document.getElementById('barcode-input').addEventListener('keypress', async (e) => {
        if (e.key !== 'Enter') return;
        const code = e.target.value.trim();
        e.target.value = '';

        const product = DB.products.find(p => 
            p.barcode === code || 
            p.name.toLowerCase().includes(code.toLowerCase()) ||
            p.id.toString() === code
        );

        if (product) {
            const existing = cart.find(c => c.id === product.id);
            if (existing) {
                existing.qty++;
            } else {
                cart.push({ ...product, qty: 1 });
            }
            updateCart(cart);
            e.target.focus();
        } else {
            toast('❌ المنتج غير موجود', 'error');
        }
    });

    window.updateCart = (items) => {
        const html = items.map(p => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
            <div>
              <b>${p.name}</b><br>
              <span style="color:var(--muted);font-size:12px">${p.brand} - ${fmt(p.selling_price)} لكل واحد</span>
            </div>
            <div style="display:flex;gap:5px;align-items:center">
              <button class="btn btn-ghost btn-sm" onclick="decreaseQty(${p.id},window.cartItems)">➖</button>
              <span style="font-weight:bold;min-width:30px;text-align:center">${p.qty}</span>
              <button class="btn btn-ghost btn-sm" onclick="increaseQty(${p.id},window.cartItems)">➕</button>
              <button class="btn btn-danger btn-sm" onclick="removeItem(${p.id},window.cartItems)">🗑️</button>
              <span style="font-weight:bold;color:var(--accent);min-width:80px;text-align:right">${fmt(p.qty * p.selling_price)}</span>
            </div>
          </div>
        `).join('');

        document.getElementById('sale-cart').innerHTML = html || '<p style="color:var(--muted);text-align:center">السلة فارغة</p>';

        const total = items.reduce((a, p) => a + (p.qty * p.selling_price), 0);
        document.getElementById('total-amount').textContent = fmt(total);

        window.cartItems = items;
    };

    window.increaseQty = (id, items) => {
        const item = items.find(i => i.id === id);
        if (item) item.qty++;
        updateCart(items);
    };

    window.decreaseQty = (id, items) => {
        const item = items.find(i => i.id === id);
        if (item && item.qty > 1) item.qty--;
        updateCart(items);
    };

    window.removeItem = (id, items) => {
        const idx = items.findIndex(i => i.id === id);
        if (idx > -1) items.splice(idx, 1);
        updateCart(items);
    };

    window.completeSale = () => {
        if (!window.cartItems?.length) {
            toast('❌ السلة فارغة', 'error');
            return;
        }

        const total = window.cartItems.reduce((a, p) => a + (p.qty * p.selling_price), 0);

        // تحديث المخزون وحساب الربح
        let profit = 0;
        window.cartItems.forEach(item => {
            const product = DB.products.find(p => p.id === item.id);
            if (product) {
                product.quantity -= item.qty;
                profit += (item.selling_price - product.cost_price) * item.qty;
                DB.saveProduct(product);
            }
        });

        const sale = {
            items: window.cartItems.map(p => ({
                product_id: p.id,
                quantity: p.qty,
                unit_price: p.selling_price
            })),
            total_amount: total,
            paid_amount: total,
            remaining_amount: 0,
            payment_method: 'نقدي',
            profit: profit,
            username: Auth.currentUser?.username || 'مستخدم'
        };

        DB.saveSale(sale);
        toast(`✅ فاتورة ${sale.invoice_number} | الإجمالي: ${fmt(total)}`);
        window.cartItems = [];
        updateCart([]);
        document.getElementById('barcode-input').focus();
    };

    window.clearCart = () => {
        if (confirm('هل متأكد؟')) {
            window.cartItems = [];
            updateCart([]);
        }
    };

    updateCart(cart);
}

function barcode_return() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw">
      <div class="th"><h3>🔄 استرجاع بالباركود</h3></div>
      <div style="padding:20px">
        <div class="fg" style="margin-bottom:20px">
          <div class="ff full"><label>ماسح الرمز (أو ابحث عن المنتج)</label>
            <input id="return-input" placeholder="امسح الباركود أو ابحث..." autofocus style="font-size:16px;padding:10px;border:2px solid var(--warn);border-radius:8px">
          </div>
        </div>
        <div id="return-list"></div>
        <div style="margin-top:20px;padding:20px;background:var(--bg3);border-radius:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:10px">
            <span>إجمالي المرجعات:</span>
            <span id="total-return" style="font-size:18px;font-weight:bold;color:var(--warn)">0</span>
          </div>
          <button class="btn btn-warn" style="width:100%;margin-bottom:10px;background:var(--warn);color:#0f1923" onclick="completeReturn()">✅ إتمام الاسترجاع</button>
          <button class="btn btn-ghost" style="width:100%" onclick="clearReturns()">🗑️ مسح القائمة</button>
        </div>
      </div>
    </div>`;

    let returns = [];
    document.getElementById('return-input').addEventListener('keypress', (e) => {
        if (e.key !== 'Enter') return;
        const code = e.target.value.trim();
        e.target.value = '';

        const product = DB.products.find(p => 
            p.barcode === code || 
            p.name.toLowerCase().includes(code.toLowerCase()) ||
            p.id.toString() === code
        );

        if (product) {
            const existing = returns.find(c => c.id === product.id);
            if (existing) {
                existing.qty++;
            } else {
                returns.push({ ...product, qty: 1 });
            }
            updateReturns(returns);
            e.target.focus();
        } else {
            toast('❌ المنتج غير موجود', 'error');
        }
    });

    window.updateReturns = (items) => {
        const html = items.map(p => `
          <div style="background:var(--bg2);border:2px solid var(--warn);border-radius:8px;padding:12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
            <div>
              <b>${p.name}</b><br>
              <span style="color:var(--muted);font-size:12px">${p.brand} - سعر الاسترجاع: ${fmt(p.selling_price)}</span>
            </div>
            <div style="display:flex;gap:5px;align-items:center">
              <button class="btn btn-ghost btn-sm" onclick="decreaseReturn(${p.id},window.returnItems)">➖</button>
              <span style="font-weight:bold;min-width:30px;text-align:center">${p.qty}</span>
              <button class="btn btn-ghost btn-sm" onclick="increaseReturn(${p.id},window.returnItems)">➕</button>
              <button class="btn btn-danger btn-sm" onclick="removeReturn(${p.id},window.returnItems)">🗑️</button>
              <span style="font-weight:bold;color:var(--warn);min-width:80px;text-align:right">${fmt(p.qty * p.selling_price)}</span>
            </div>
          </div>
        `).join('');

        document.getElementById('return-list').innerHTML = html || '<p style="color:var(--muted);text-align:center">لا توجد مرجعات</p>';

        const total = items.reduce((a, p) => a + (p.qty * p.selling_price), 0);
        document.getElementById('total-return').textContent = fmt(total);

        window.returnItems = items;
    };

    window.increaseReturn = (id, items) => {
        const item = items.find(i => i.id === id);
        if (item) item.qty++;
        updateReturns(items);
    };

    window.decreaseReturn = (id, items) => {
        const item = items.find(i => i.id === id);
        if (item && item.qty > 1) item.qty--;
        updateReturns(items);
    };

    window.removeReturn = (id, items) => {
        const idx = items.findIndex(i => i.id === id);
        if (idx > -1) items.splice(idx, 1);
        updateReturns(items);
    };

    window.completeReturn = () => {
        if (!window.returnItems?.length) {
            toast('❌ لا توجد مرجعات', 'error');
            return;
        }

        // تحديث المخزون
        window.returnItems.forEach(item => {
            const product = DB.products.find(p => p.id === item.id);
            if (product) {
                product.quantity += item.qty;
                DB.saveProduct(product);
            }
        });

        toast('✅ تم معالجة الاسترجاع بنجاح');
        window.returnItems = [];
        updateReturns([]);
        document.getElementById('return-input').focus();
    };

    window.clearReturns = () => {
        if (confirm('هل متأكد؟')) {
            window.returnItems = [];
            updateReturns([]);
        }
    };

    updateReturns(returns);
}

function count() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw"><div class="th"><h3>📊 الجرد</h3></div><div style="padding:20px">✅ قسم الجرد - جاهز للاستخدام</div></div>`;
}

function mobile() {
    const c = document.getElementById('pc');
    c.innerHTML = `<div class="tw"><div class="th"><h3>📱 إدارة الموبايلات</h3></div><div style="padding:20px">✅ قسم إدارة الموبايلات - جاهز للاستخدام</div></div>`;
}

function inventory(q = '', cat = 'الكل', st = 'الكل') {
    const c = document.getElementById('pc');
    const products = DB.products;

    const html = `
    <div class="sb-bar">
        <input class="si" id="inv-search" placeholder="🔍 بحث..." value="${q}" oninput="inventory(this.value,document.getElementById('icat').value,document.getElementById('ist').value)">
        <select id="icat" onchange="inventory(document.getElementById('inv-search').value,this.value,document.getElementById('ist').value)">
            <option value="الكل">كل الفئات</option>
            <option value="موبايلات">موبايلات</option>
            <option value="ملحقات">ملحقات</option>
            <option value="أجهزة لوحية">أجهزة لوحية</option>
            <option value="أخرى">أخرى</option>
        </select>
        <select id="ist" onchange="inventory(document.getElementById('inv-search').value,document.getElementById('icat').value,this.value)">
            <option value="الكل">كل الحالات</option>
            <option value="متوفر">متوفر</option>
            <option value="منخفض">منخفض</option>
            <option value="منتهي">منتهي</option>
        </select>
        <button class="btn btn-success" onclick="addInvProd()">+ إضافة منتج</button>
        <button class="btn btn-warn" onclick="openInventoryCount()">📊 جرد</button>
    </div>

    <div id="inv-stats" class="sg"></div>

    <div id="inv-totals" style="display:none;margin-bottom:18px">
        <div id="inv-totals-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px"></div>
    </div>

    <div class="tw"><div class="th"><h3>📋 المخزون</h3><span id="icnt" style="color:var(--muted);font-size:13px"></span></div><div id="inv-table"></div></div>`;

    c.innerHTML = html;

    // فلتر البحث
    let filteredProducts = products;
    if (q) {
        filteredProducts = products.filter(p =>
            p.name.includes(q) ||
            p.brand.includes(q) ||
            p.category.includes(q) ||
            p.barcode?.includes(q)
        );
    }

    // فلتر الفئة
    let items = cat === 'الكل' ? filteredProducts : filteredProducts.filter(p => p.category === cat);

    // فلتر الحالة
    if (st === 'متوفر') items = items.filter(p => p.quantity > p.min_stock);
    else if (st === 'منخفض') items = items.filter(p => p.quantity <= p.min_stock && p.quantity > 0);
    else if (st === 'منتهي') items = items.filter(p => p.quantity <= 0);

    document.getElementById('icat').value = cat;
    document.getElementById('ist').value = st;

    let totalCost = 0, totalValue = 0, totalProfit = 0, outStock = 0, lowStock = 0, good = 0, totalQty = 0;
    items.forEach(p => {
        const itemCost = p.quantity * p.cost_price;
        const itemValue = p.quantity * p.selling_price;
        const itemProfit = p.quantity * (p.selling_price - p.cost_price);
        totalCost += itemCost;
        totalValue += itemValue;
        totalProfit += itemProfit;
        totalQty += p.quantity;
        if (p.quantity <= 0) outStock++;
        else if (p.quantity <= p.min_stock) lowStock++;
        else good++;
    });

    document.getElementById('inv-stats').innerHTML = `
    <div class="sc bl"><div class="lb">📦 إجمالي الكمية</div><div class="vl">${totalQty}</div><div class="sb">${items.length} منتج</div></div>
    <div class="sc gr"><div class="lb">💰 قيمة المخزون</div><div class="vl">${fmt(totalValue)}</div><div class="sb">تكلفة: ${fmt(totalCost)}</div></div>
    <div class="sc pu"><div class="lb">💹 الربح المتوقع</div><div class="vl">${fmt(totalProfit)}</div><div class="sb">هامش: ${totalValue > 0 ? Math.round(totalProfit / totalValue * 100) : 0}%</div></div>
    <div class="sc bg"><div class="lb">✅ متوفر</div><div class="vl">${good}</div></div>
    <div class="sc bw"><div class="lb">⚠️ منخفض</div><div class="vl">${lowStock}</div></div>
    <div class="sc br"><div class="lb">❌ منتهي</div><div class="vl">${outStock}</div></div>
    `;

    // عرض بطاقة الإجمالي والأرباح
    const totDiv = document.getElementById('inv-totals');
    totDiv.style.display = 'block';
    document.getElementById('inv-totals-grid').innerHTML = `
    <div style="background:var(--bg3);border-radius:9px;padding:14px;border-right:4px solid var(--accent)">
        <div style="font-size:11px;color:var(--muted)">إجمالي تكلفة المخزون</div>
        <div style="font-size:20px;font-weight:900;color:var(--accent)">${fmt(totalCost)}</div>
    </div>
    <div style="background:var(--bg3);border-radius:9px;padding:14px;border-right:4px solid var(--accent2)">
        <div style="font-size:11px;color:var(--muted)">إجمالي قيمة البيع</div>
        <div style="font-size:20px;font-weight:900;color:var(--accent2)">${fmt(totalValue)}</div>
    </div>
    <div style="background:var(--bg3);border-radius:9px;padding:14px;border-right:4px solid #a855f7">
        <div style="font-size:11px;color:var(--muted)">الربح المتوقع</div>
        <div style="font-size:20px;font-weight:900;color:#a855f7">${fmt(totalProfit)}</div>
    </div>
    <div style="background:var(--bg3);border-radius:9px;padding:14px;border-right:4px solid var(--warn)">
        <div style="font-size:11px;color:var(--muted)">نسبة الربح</div>
        <div style="font-size:20px;font-weight:900;color:var(--warn)">${totalCost > 0 ? Math.round(totalProfit / totalCost * 100) : 0}%</div>
    </div>
    `;

    document.getElementById('icnt').textContent = items.length + ' منتج';
    document.getElementById('inv-table').innerHTML = items.length
        ? `<table><tr><th>الاسم</th><th>الماركة</th><th>الفئة</th><th>الباركود</th><th>سعر الشراء</th><th>سعر البيع</th><th>هامش الربح</th><th>الكمية</th><th>القيمة الإجمالية</th><th>الربح المتوقع</th><th>الحالة</th><th></th></tr>
        ${items.map(p => {
            const status = p.quantity <= 0 ? '❌ منتهي' : p.quantity <= p.min_stock ? '⚠️ منخفض' : '✅ متوفر';
            const statusColor = p.quantity <= 0 ? 'br' : p.quantity <= p.min_stock ? 'bw' : 'bg';
            const itemValue = (p.quantity * p.selling_price);
            const itemProfit = p.quantity * (p.selling_price - p.cost_price);
            const margin = p.selling_price - p.cost_price;
            const marginPct = p.cost_price > 0 ? Math.round(margin / p.cost_price * 100) : 0;
            return `<tr><td><b>${p.name}</b></td><td>${p.brand}</td><td>${p.category}</td><td style="font-size:11px;color:var(--muted);font-family:monospace">${p.barcode || '—'}</td><td>${fmt(p.cost_price)}</td><td style="color:var(--accent2)">${fmt(p.selling_price)}</td><td style="color:${margin >= 0 ? 'var(--accent2)' : 'var(--danger)'};font-size:12px">${margin >= 0 ? '+' : ''}${fmt(margin)} (${marginPct}%)</td>
            <td><span class="badge ${statusColor}">${p.quantity}</span></td><td style="color:var(--accent2);font-weight:700">${fmt(itemValue)}</td><td style="color:#a855f7;font-weight:700">${fmt(itemProfit)}</td><td>${status}</td>
            <td style="white-space:nowrap"><button class="btn btn-ghost btn-sm" title="تحديث سريع" onclick="quickUpdateQty(${p.id},'${p.name.replace(/'/g, '')}',${p.quantity})">⚡</button><button class="btn btn-ghost btn-sm" onclick='eInvProd(${JSON.stringify(p)})'>✏️</button> <button class="btn btn-danger btn-sm" onclick="dInvProd(${p.id},'${p.name.replace(/'/g, '')}')">🗑️</button></td></tr>`;
        }).join('')}</table>`
        : em('لا توجد منتجات');
}

function renderInventoryTable(products) {
    const el = document.getElementById('inv-table');
    if (!el) return;

    if (!products.length) {
        el.innerHTML = em('لا توجد منتجات');
        return;
    }

    el.innerHTML = `
    <table>
        <tr>
            <th>المنتج</th>
            <th>الماركة</th>
            <th>الفئة</th>
            <th>الكمية</th>
            <th>الحد الأدنى</th>
            <th>سعر الشراء</th>
            <th>سعر البيع</th>
            <th>القيمة</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
        </tr>
        ${products.map(p => {
            const statusClass = p.quantity <= 0 ? 'br' : p.quantity <= p.min_stock ? 'bw' : 'bg';
            const statusText = p.quantity <= 0 ? 'نافد' : p.quantity <= p.min_stock ? 'منخفض' : 'متوفر';
            const value = p.cost_price * p.quantity;

            return `
            <tr>
                <td><b>${p.name}</b></td>
                <td>${p.brand}</td>
                <td>${p.category}</td>
                <td><span class="badge ${statusClass}">${p.quantity}</span></td>
                <td>${p.min_stock}</td>
                <td>${fmt(p.cost_price)}</td>
                <td>${fmt(p.selling_price)}</td>
                <td>${fmt(value)}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td style="white-space:nowrap">
                    <button class="btn btn-ghost btn-sm" onclick='eInvProd(${JSON.stringify(p)})' title="تعديل">✏️</button>
                    <button class="btn btn-warn btn-sm" onclick='adjInvStock(${p.id})' title="تعديل الكمية">📦</button>
                    <button class="btn btn-danger btn-sm" onclick="dInvProd(${p.id},'${p.name.replace(/'/g, '')}')" title="حذف">🗑️</button>
                </td>
            </tr>`;
        }).join('')}
    </table>`;
}

function filterInventory(filter, tabElement) {
    // تحديث التبويبات
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tabElement.classList.add('active');

    const products = DB.products;
    let filtered;

    switch(filter) {
        case 'available':
            filtered = products.filter(p => p.quantity > p.min_stock);
            break;
        case 'low':
            filtered = products.filter(p => p.quantity > 0 && p.quantity <= p.min_stock);
            break;
        case 'out':
            filtered = products.filter(p => p.quantity <= 0);
            break;
        default:
            filtered = products;
    }

    renderInventoryTable(filtered);
}

function searchInventory(query) {
    const products = DB.products;
    const filtered = products.filter(p =>
        p.name.includes(query) ||
        p.brand.includes(query) ||
        p.category.includes(query) ||
        p.barcode?.includes(query)
    );
    renderInventoryTable(filtered);
}

// إضافة منتج من قسم المخزون
function addInvProd() {
    omo('➕ إضافة منتج جديد', `<div class="fg">
        <div class="ff full"><label>الاسم *</label><input id="ipn" placeholder="iPhone 15 Pro"></div>
        <div class="ff"><label>الماركة *</label><input id="ipb" placeholder="Apple"></div>
        <div class="ff"><label>الموديل</label><input id="ipm" placeholder="A1234"></div>
        <div class="ff"><label>الفئة</label><select id="ipcat" onchange="toggleInvCondField()"><option>موبايلات</option><option>ملحقات</option><option>أجهزة لوحية</option><option>أخرى</option></select></div>
        <div class="ff"><label>سعر الشراء *</label><input id="ipcp" type="number" placeholder="0"></div>
        <div class="ff"><label>سعر البيع *</label><input id="ipsp" type="number" placeholder="0"></div>
        <div class="ff"><label>الكمية *</label><input id="ipq" type="number" placeholder="0"></div>
        <div class="ff"><label>الحد الأدنى</label><input id="ipms" type="number" placeholder="5"></div>
        <div class="ff"><label>الباركود</label><input id="ipbar" placeholder="اختياري"></div>
        <div class="ff" id="icond-field"><label>الحالة</label><select id="ipcon"><option>جديد</option><option>مستعمل</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="svInvProd()">💾 حفظ</button>`);
    setTimeout(toggleInvCondField, 50);
}

function toggleInvCondField() {
    const cat = document.getElementById('ipcat')?.value;
    const cf = document.getElementById('icond-field');
    if (cf) cf.style.display = cat === 'موبايلات' ? 'flex' : 'none';
}

function svInvProd() {
    const product = {
        name: document.getElementById('ipn').value,
        brand: document.getElementById('ipb').value,
        model: document.getElementById('ipm').value || '-',
        category: document.getElementById('ipcat').value,
        cost_price: parseFloat(document.getElementById('ipcp').value) || 0,
        selling_price: parseFloat(document.getElementById('ipsp').value) || 0,
        quantity: parseInt(document.getElementById('ipq').value) || 0,
        min_stock: parseInt(document.getElementById('ipms').value) || 5,
        barcode: document.getElementById('ipbar').value || null,
        condition: document.getElementById('ipcon').value
    };

    if (!product.name || !product.brand) {
        toast('يرجى ملء الحقول المطلوبة', 'error');
        return;
    }

    DB.saveProduct(product);
    cmo();
    toast('تم حفظ المنتج بنجاح');
    inventory();
}

// تعديل منتج من قسم المخزون
function eInvProd(p) {
    omo('✏️ تعديل المنتج', `<div class="fg">
        <div class="ff full"><label>الاسم</label><input id="ien" value="${p.name}"></div>
        <div class="ff"><label>الماركة</label><input id="ieb" value="${p.brand}"></div>
        <div class="ff"><label>سعر الشراء</label><input id="iec" type="number" value="${p.cost_price}"></div>
        <div class="ff"><label>سعر البيع</label><input id="ies" type="number" value="${p.selling_price}"></div>
        <div class="ff"><label>الكمية</label><input id="ieq" type="number" value="${p.quantity}"></div>
        <div class="ff"><label>الحد الأدنى</label><input id="iem" type="number" value="${p.min_stock}"></div>
        <div class="ff"><label>الحالة</label><select id="ieco"><option ${p.condition === 'جديد' ? 'selected' : ''}>جديد</option><option ${p.condition === 'مستعمل' ? 'selected' : ''}>مستعمل</option><option ${p.condition === 'مجدد' ? 'selected' : ''}>مجدد</option></select></div>
    </div>`, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="upInvProd(${p.id})">💾 حفظ</button>`);
}

function upInvProd(id) {
    const product = {
        id,
        name: document.getElementById('ien').value,
        brand: document.getElementById('ieb').value,
        model: '-',
        cost_price: parseFloat(document.getElementById('iec').value) || 0,
        selling_price: parseFloat(document.getElementById('ies').value) || 0,
        quantity: parseInt(document.getElementById('ieq').value) || 0,
        min_stock: parseInt(document.getElementById('iem').value) || 5,
        condition: document.getElementById('ieco').value
    };

    DB.saveProduct(product);
    cmo();
    toast('تم تحديث المنتج بنجاح');
    inventory();
}

// تعديل كمية المخزون
function adjInvStock(id) {
    const product = DB.products.find(p => p.id === id);
    if (!product) return;

    omo('📦 تعديل كمية المخزون', `
    <div style="background:var(--bg3);padding:15px;border-radius:8px;margin-bottom:15px">
        <div style="margin-bottom:10px"><b>${product.name}</b></div>
        <div style="color:var(--muted)">الكمية الحالية: ${product.quantity}</div>
    </div>
    <div class="fg">
        <div class="ff"><label>إضافة (+)</label><input id="ias" type="number" placeholder="0"></div>
        <div class="ff"><label>خصم (-)</label><input id="irs" type="number" placeholder="0"></div>
    </div>
    <div class="ff" style="margin-top:10px"><label>السبب</label><input id="irsn" placeholder="سبب التعديل"></div>
    `, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="confirmAdjStock(${id})">💾 حفظ</button>`);
}

function confirmAdjStock(id) {
    const product = DB.products.find(p => p.id === id);
    if (!product) return;

    const addQty = parseInt(document.getElementById('ias').value) || 0;
    const removeQty = parseInt(document.getElementById('irs').value) || 0;
    const reason = document.getElementById('irsn').value || 'تعديل يدوي';

    const newQty = product.quantity + addQty - removeQty;
    if (newQty < 0) {
        toast('الكمية النهائية لا يمكن أن تكون سالبة', 'error');
        return;
    }

    product.quantity = newQty;
    DB.saveProduct(product);

    cmo();
    toast(`تم تحديث الكمية إلى ${newQty}`);
    inventory();
}

// حذف منتج من قسم المخزون
function dInvProd(id, name) {
    if (!confirm(`حذف: ${name}?`)) return;
    DB.deleteProduct(id);
    toast('تم حذف المنتج');
    inventory();
}

// تحديث سريع للكمية
function quickUpdateQty(id, name, current) {
    omo(`⚡ تحديث كمية: ${name}`, `
    <div class="fg">
        <div class="ff full">
            <label style="font-size:12px">الكمية الحالية: <b>${current}</b></label>
            <input id="nqty" type="number" value="${current}" style="font-size:18px;font-weight:700;text-align:center" autofocus>
        </div>
    </div>
    `, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="doQuickUpdate(${id})">✅ حفظ</button>`);
    setTimeout(() => document.getElementById('nqty')?.focus(), 100);
}

function doQuickUpdate(id) {
    const newQty = parseInt(document.getElementById('nqty').value) || 0;
    const product = DB.products.find(p => p.id === id);
    if (product) {
        product.quantity = newQty;
        DB.saveProduct(product);
        cmo();
        toast('✅ تم تحديث الكمية');
        inventory();
    }
}

// عملية جرد المخزون
function openInventoryCount() {
    omo('📊 عملية جرد المخزون', `
    <div class="fg">
        <div class="ff full" style="background:var(--bg3);padding:12px;border-radius:8px;margin-bottom:12px">
            <p style="color:var(--muted);font-size:13px;line-height:1.6">
                🔍 <b>خطوات الجرد:</b><br>
                1️⃣ حدد الفئة المراد جردها<br>
                2️⃣ قارن الكمية الفعلية مع النظام<br>
                3️⃣ سجل أي فروقات<br>
                4️⃣ احفظ نتائج الجرد
            </p>
        </div>
        <div class="ff full">
            <label>الفئة</label>
            <select id="count-cat">
                <option value="الكل">كل الفئات</option>
                <option value="موبايلات">موبايلات</option>
                <option value="ملحقات">ملحقات</option>
                <option value="أجهزة لوحية">أجهزة لوحية</option>
                <option value="أخرى">أخرى</option>
            </select>
        </div>
        <div class="ff full">
            <label>ملاحظات الجرد</label>
            <textarea id="count-notes" placeholder="سجل الملاحظات والفروقات..."></textarea>
        </div>
    </div>
    `, `<button class="btn btn-ghost" onclick="cmo()">إلغاء</button><button class="btn btn-success" onclick="doInventoryCount()">✅ تسجيل الجرد</button>`);
}

function doInventoryCount() {
    const cat = document.getElementById('count-cat').value;
    const notes = document.getElementById('count-notes').value;

    // حفظ سجل الجرد
    const countRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        category: cat,
        notes: notes,
        items: []
    };

    // إضافة المنتجات للجرد
    const products = DB.products;
    const filteredProducts = cat === 'الكل' ? products : products.filter(p => p.category === cat);

    filteredProducts.forEach(p => {
        countRecord.items.push({
            product_id: p.id,
            name: p.name,
            system_qty: p.quantity,
            actual_qty: p.quantity,
            difference: 0
        });
    });

    // حفظ سجل الجرد في localStorage
    let counts = JSON.parse(localStorage.getItem('inventory_counts') || '[]');
    counts.push(countRecord);
    localStorage.setItem('inventory_counts', JSON.stringify(counts));

    cmo();
    toast(`✅ تم تسجيل جرد ${cat}`);
    inventory();
}

function license() {
    const c = document.getElementById('pc');
    c.innerHTML = `
    <div class="tw">
        <div class="th"><h3>🔐 معلومات الترخيص</h3></div>
        <div style="padding:20px">
            <div style="background:var(--bg3);padding:15px;border-radius:8px;margin-bottom:15px">
                <h4 style="margin-bottom:10px;color:var(--accent)">المستمر للمحاسبة - النسخة المجانية</h4>
                <p style="margin-bottom:5px">الإصدار: 1.0.0</p>
                <p style="margin-bottom:5px">الترخيص: مجاني للاستخدام الشخصي</p>
                <p>للحصول على النسخة الكاملة، يرجى التواصل معنا</p>
            </div>
            <div style="text-align:center">
                <p style="margin-bottom:10px;color:var(--muted)">© 2024 المستمر للمحاسبة - جميع الحقوق محفوظة</p>
            </div>
        </div>
    </div>`;
}

// ============================================
// تهيئة التطبيق
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة قاعدة البيانات
    DB.init();

    // التحقق من الجلسة
    if (Auth.checkSession()) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        document.getElementById('u-name').textContent = Auth.currentUser.name;
        document.getElementById('sb-user').textContent = 'مرحباً، ' + Auth.currentUser.name;
        go('dashboard');
    }

    // الاستماع لضغط Enter في شاشة تسجيل الدخول
    document.addEventListener('keydown', e => {
        if (e.key === 'Enter' && document.getElementById('login-screen').style.display !== 'none') {
            doLogin();
        }
    });
});
