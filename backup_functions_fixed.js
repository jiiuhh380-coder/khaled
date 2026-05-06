// تحميل قائمة النسخ الاحتياطية
function loadBackupFiles() {
    const backupSelect = document.getElementById('backup_files');
    if (!backupSelect) return;

    // محاكاة النسخ الاحتياطية من localStorage
    const backups = [];
    const prefix = DB.getDBPrefix();

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix + 'backup_')) {
            backups.push({
                key: key,
                date: key.replace(prefix + 'backup_', '')
            });
        }
    }

    // ترتيب النسخ الاحتياطية حسب التاريخ
    backups.sort((a, b) => new Date(b.date) - new Date(a.date));

    // تحديث القائمة
    backupSelect.innerHTML = '<option value="">اختر نسخة احتياطية</option>';
    backups.forEach(backup => {
        const option = document.createElement('option');
        option.value = backup.key;
        option.textContent = backup.date;
        backupSelect.appendChild(option);
    });

    if (backups.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '🚫 لا توجد نسخ احتياطية';
        option.disabled = true;
        backupSelect.appendChild(option);
    }
}

// استرداد نسخة احتياطية
function restoreBackup() {
    const backupSelect = document.getElementById('backup_files');
    const externalBackup = document.getElementById('external_backup');

    if (!backupSelect || !externalBackup) return;

    let backupKey = backupSelect.value;

    // إذا تم اختيار ملف خارجي
    if (externalBackup.files.length > 0) {
        const file = externalBackup.files[0];
        const fileName = file.name.toLowerCase();

        // التحقق من نوع الملف
        if (fileName.endsWith('.db')) {
            // ملف قاعدة بيانات من تطبيق سطح المكتب
            if (!confirm('⚠️ تأكيد الاسترداد\n\nهل أنت متأكد من استرداد نسخة قاعدة البيانات من تطبيق سطح المكتب؟\n\n⚠️ تحذير: هذه العملية ستستبدل جميع البيانات الحالية!')) {
                return;
            }

            toast('⏳ جاري قراءة ملف قاعدة البيانات...', 'info');

            // إعداد البيانات للإرسال
            const formData = new FormData();
            formData.append('file', file);

            // محاولة الاتصال بالخادم الخلفي
            fetch('/restore_db', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`خطأ في الخادم: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // حفظ البيانات في localStorage
                    const prefix = DB.getDBPrefix();
                    Object.keys(data.data).forEach(key => {
                        localStorage.setItem(prefix + key, JSON.stringify(data.data[key]));
                    });

                    toast('✅ تم استرداد النسخة الاحتياطية بنجاح');
                    setTimeout(() => location.reload(), 1500);
                } else {
                    toast('❌ خطأ في قراءة ملف قاعدة البيانات: ' + data.error, 'error');
                }
            })
            .catch(error => {
                console.error('Error restoring backup:', error);
                toast('⚠️ لم يتم العثور على خادم خلفي', 'error');
                toast('⚠️ لاسترداد ملفات .db من تطبيق سطح المكتب، يرجى تشغيل الخادم الخلفي بالأمر: python server.py', 'error');
            });

            return;
        } else {
            // ملف JSON عادي
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const backupData = JSON.parse(e.target.result);

                    if (!confirm('⚠️ تأكيد الاسترداد\n\nهل أنت متأكد من استرداد النسخة الاحتياطية؟\n\n⚠️ تحذير: هذه العملية ستستبدل قاعدة البيانات الحالية بجميع بياناتها!')) {
                        return;
                    }

                    // استعادة البيانات
                    const prefix = DB.getDBPrefix();
                    Object.keys(backupData).forEach(key => {
                        localStorage.setItem(prefix + key, JSON.stringify(backupData[key]));
                    });

                    toast('✅ تم استرداد النسخة الاحتياطية بنجاح');
                    setTimeout(() => location.reload(), 1500);
                } catch (error) {
                    toast('❌ خطأ في قراءة الملف: ' + error.message, 'error');
                }
            };
            reader.readAsText(file);
            return;
        }
    }

    // إذا تم اختيار نسخة من القائمة
    if (!backupKey) {
        toast('⚠️ يرجى اختيار نسخة احتياطية للاسترداد', 'error');
        return;
    }

    if (!confirm('⚠️ تأكيد الاسترداد\n\nهل أنت متأكد من استرداد النسخة الاحتياطية؟\n\n⚠️ تحذير: هذه العملية ستستبدل قاعدة البيانات الحالية بجميع بياناتها!')) {
        return;
    }

    try {
        // استعادة البيانات من النسخة الاحتياطية
        const backupData = JSON.parse(localStorage.getItem(backupKey));
        const prefix = DB.getDBPrefix();

        Object.keys(backupData).forEach(key => {
            localStorage.setItem(prefix + key, JSON.stringify(backupData[key]));
        });

        toast('✅ تم استرداد النسخة الاحتياطية بنجاح');
        setTimeout(() => location.reload(), 1500);
    } catch (error) {
        toast('❌ خطأ في استرداد النسخة الاحتياطية: ' + error.message, 'error');
    }
}

// إنشاء نسخة احتياطية
function createBackup() {
    const prefix = DB.getDBPrefix();
    const backupData = {};
    const backupKey = prefix + 'backup_' + new Date().toISOString();

    // جمع جميع البيانات
    const keys = ['users', 'products', 'sales', 'expenses', 'maintenance', 'purchases', 'suppliers', 'settings'];
    keys.forEach(key => {
        backupData[key] = JSON.parse(localStorage.getItem(prefix + key) || '[]');
    });

    // حفظ النسخة الاحتياطية
    localStorage.setItem(backupKey, JSON.stringify(backupData));

    toast('✅ تم إنشاء نسخة احتياطية بنجاح');
    loadBackupFiles();
}
