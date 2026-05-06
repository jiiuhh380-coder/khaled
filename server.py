from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import json
import os

app = Flask(__name__, static_folder='.')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/restore_db', methods=['POST'])
def restore_db():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'لم يتم تحميل أي ملف'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'error': 'لم يتم اختيار ملف'})

        if not file.filename.endswith('.db'):
            return jsonify({'success': False, 'error': 'يجب أن يكون الملف من نوع .db'})

        # حفظ الملف مؤقتاً
        temp_path = 'temp_restore.db'
        file.save(temp_path)

        # قراءة البيانات من قاعدة البيانات
        conn = sqlite3.connect(temp_path)
        cursor = conn.cursor()

        backup_data = {}
        tables = ['users', 'products', 'sales', 'expenses', 'maintenance', 'purchases', 'suppliers']

        for table in tables:
            try:
                cursor.execute(f"SELECT * FROM {table}")
                columns = [description[0] for description in cursor.description]
                rows = cursor.fetchall()

                # تحويل الصفوف إلى قواميس
                table_data = []
                for row in rows:
                    row_dict = {}
                    for i, col in enumerate(columns):
                        row_dict[col] = row[i]
                    table_data.append(row_dict)

                backup_data[table] = table_data
            except Exception as e:
                print(f"Error reading table {table}: {e}")
                backup_data[table] = []

        conn.close()

        # حذف الملف المؤقت
        if os.path.exists(temp_path):
            os.remove(temp_path)

        return jsonify({'success': True, 'data': backup_data})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
