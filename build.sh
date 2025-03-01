#!/bin/bash

# Исходная и целевая директории
SRC_DIR="public/src"
BUILD_DIR="public/build"

# Создаем целевую папку, если её нет
mkdir -p "$BUILD_DIR"

# Рекурсивно находим все .hbs файлы и компилируем их
find "$SRC_DIR" -type f -name "*.hbs" | while read -r hbs_file; do
    # Заменяем исходный путь и расширение для создания выходного файла
    output_file="${hbs_file/$SRC_DIR/$BUILD_DIR}" # Меняем путь
    output_file="${output_file%.hbs}.js"         # Меняем расширение .hbs → .js

    # Создаем директорию, если она не существует
    mkdir -p "$(dirname "$output_file")"

    # Компилируем Handlebars-шаблон
    npx handlebars -m "$hbs_file" -f "$output_file"

    echo "✔ Compiled: $hbs_file → $output_file"
done
