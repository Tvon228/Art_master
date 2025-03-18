from PIL import Image
import os

# Абсолютные пути (замените на ваш реальный путь)
INPUT_DIR = r"C:\Users\patsy\OneDrive\Documents\Project\Art_master\src\assets\dops"
OUTPUT_DIR = INPUT_DIR  # Сохраняем в ту же директорию
QUALITY = 80

# Автоматически получаем список PNG-файлов
files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith('.png')]

def convert_to_webp(input_path, output_path):
    try:
        with Image.open(input_path) as img:
            webp_path = os.path.splitext(input_path)[0] + ".webp"
            img.save(webp_path, "WEBP", quality=QUALITY, optimize=True)
            os.remove(input_path)  # Удаляем оригинальный PNG
        print(f"✅ Успешно: {os.path.basename(input_path)}")
        return True
    except Exception as e:
        print(f"❌ Ошибка: {os.path.basename(input_path)} -> {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Конвертация PNG -> WebP...")
    
    success = 0
    errors = 0
    
    for filename in files:
        input_path = os.path.join(INPUT_DIR, filename)
        
        if convert_to_webp(input_path, OUTPUT_DIR):
            success += 1
        else:
            errors += 1
    
    print(f"\n🎉 Результаты:")
    print(f"Успешно: {success}")
    print(f"Ошибок: {errors}")
    print(f"Всего файлов: {len(files)}")