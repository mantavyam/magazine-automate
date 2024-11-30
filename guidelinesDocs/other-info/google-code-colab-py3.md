---
description: Python 3 Compute Engine on Google Colaboratory
---

# Google Code Colab: Py3

{% embed url="https://colab.research.google.com/drive/1GjK6zO6-cwtCak-v8TvE_rAoQ8-cCR0L?usp=sharing" %}
Link to Colaboratory
{% endembed %}

## **PROCESS: 1 \[Newsletter-DAILY]**

### CREATE RAW

````python
```notebook-python
# Install necessary libraries at the top
!pip install python-pptx
pip install --upgrade python-docx

from google.colab import auth, drive
from pptx import Presentation
from docx import Document
from docx.shared import Pt
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os
import re
from datetime import datetime

# Authenticate and mount Google Drive
auth.authenticate_user()
drive.mount('/content/drive')

# Function to check if text is in Hindi
def is_hindi(text):
    hindi_chars = [chr(i) for i in range(2304, 2432)]  # Unicode range for Hindi characters
    return any(char in hindi_chars for char in text)

# Function to extract text and table data from a PPTX file
def extract_text_and_tables_from_pptx(pptx_path):
    presentation = Presentation(pptx_path)
    slides_data = []

    for slide in presentation.slides:
        slide_data = {"text": [], "tables": []}
        first_text = True

        for shape in slide.shapes:
            if shape.has_text_frame:
                for paragraph in shape.text_frame.paragraphs:
                    text = paragraph.text.strip()
                    if text:
                        if first_text and not text.startswith("About") and 15 < len(text) < 120:
                            slide_data["text"].append(("headline", text))
                            first_text = False
                        else:
                            slide_data["text"].append(("paragraph", text))
            if shape.has_table:
                table_data = []
                table = shape.table
                for row in table.rows:
                    row_data = [cell.text for cell in row.cells]
                    table_data.append(row_data)
                slide_data["tables"].append(table_data)

        slides_data.append(slide_data)

    return slides_data

# Function to create a DOCX file with extracted data
def create_docx_with_data(docx_path, slides_data):
    document = Document()

    # Add the current date as a title (formatted as DD-MM-YY)
    current_date = datetime.now().strftime("%d-%m-%y")
    title = document.add_heading(level=0)
    run = title.add_run(current_date)
    run.bold = True
    run.font.size = Pt(24)

    for slide_index, slide in enumerate(slides_data):
        if slide_index > 0:
            slide_divider = document.add_paragraph("NEWSLIDE")  # Add slide divider
            slide_divider.alignment = WD_ALIGN_PARAGRAPH.CENTER

        # Add text data
        for text_type, text in slide["text"]:
            if text_type == "headline":
                document.add_heading(text, level=2)
            else:
                document.add_paragraph(text)

        # Add table data
        for table in slide["tables"]:
            doc_table = document.add_table(rows=len(table), cols=len(table[0]))
            doc_table.alignment = WD_TABLE_ALIGNMENT.CENTER

            for i, row in enumerate(table):
                for j, cell_text in enumerate(row):
                    cell = doc_table.cell(i, j)
                    cell.text = cell_text

            for row in doc_table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        for run in paragraph.runs:
                            run.font.size = Pt(10)

    document.save(docx_path)

# Function to format the DOCX file
def format_docx(docx_path):
    document = Document(docx_path)
    for paragraph in document.paragraphs:
        if is_hindi(paragraph.text) or 'kapil kathpal' in paragraph.text.lower():
            p = paragraph._element
            p.getparent().remove(p)
            p._p = p._element = None

    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                cell_paragraphs = list(cell.paragraphs)
                for paragraph in cell_paragraphs:
                    if is_hindi(paragraph.text) or 'kapil kathpal' in paragraph.text.lower():
                        p = paragraph._element
                        p.getparent().remove(p)
                        p._p = p._element = None

    document.save(docx_path)

# Function to identify categories and make them heading level 1
def identify_and_make_headings(docx_path):
    document = Document(docx_path)
    headings_style = document.styles['Heading 1']
    paragraphs = list(document.paragraphs)

    for i, paragraph in enumerate(paragraphs):
        text = paragraph.text.strip()
        if len(text) < 15 and not text.startswith("About") and "NEWSLIDE" not in text:
            paragraph.style = headings_style

    document.save(docx_path)

# Main function
def main():
    # Get the PPTX file name from user input
    pptx_file_name = input("Enter the exact name of the PPTX file stored in Google Drive (e.g., '1-1-24.pptx'): ")
    pptx_file_path = os.path.join("/content/drive/My Drive/", pptx_file_name)

    # Extract text and table data from the PPTX file
    slides_data = extract_text_and_tables_from_pptx(pptx_file_path)

    # Create a new DOCX file and save it to Google Drive
    docx_file_name = f"RAW-{pptx_file_name.rsplit('.', 1)[0]}-NEWSLETTER.docx"
    docx_file_path = os.path.join("/content/drive/My Drive/", docx_file_name)
    create_docx_with_data(docx_file_path, slides_data)

    # Format the newly created DOCX file
    format_docx(docx_file_path)

    # Identify and make categories heading level 1
    identify_and_make_headings(docx_file_path)

    print(f"Data extracted from '{pptx_file_name}' and saved into '{docx_file_name}' in Google Drive.")

# Execute main function
main()
```
````

### EXTRACT IMG DATA

````python
```notebook-python
import os
from datetime import datetime
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from google.colab import drive, auth
from googleapiclient.discovery import build
import io
from PIL import Image

# Authenticate user
auth.authenticate_user()

# Mount Google Drive
drive.mount('/content/drive')

# Function to download the PPTX file from Google Drive
def download_pptx_file(file_name):
    file_path = f"/content/drive/My Drive/{file_name}"
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_name} does not exist in Google Drive.")
    return file_path

# Function to create a new folder in the same directory as the PPTX file
def create_image_folder(pptx_file_name):
    folder_name = os.path.splitext(pptx_file_name)[0] + "-IMAGES"
    folder_path = f"/content/drive/My Drive/{folder_name}"
    os.makedirs(folder_path, exist_ok=True)
    return folder_path

# Function to extract images from slides and save them
def extract_and_save_images(pptx_path, folder_path):
    presentation = Presentation(pptx_path)
    image_index = 1

    for slide_number, slide in enumerate(presentation.slides, start=1):
        slide_heading = "No_Heading"  # Default if no heading is found
        for shape in slide.shapes:
            if shape.has_text_frame and shape.text_frame.text:
                # Assuming the first shape with text is the heading
                slide_heading = shape.text_frame.text.split("\n")[0]
                break

        for shape in slide.shapes:
            if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
                image = shape.image
                image_stream = io.BytesIO(image.blob)
                img = Image.open(image_stream)

                img_file_name = f"{image_index}-{slide_heading[:30].replace(' ', '_')}.png"
                img_file_path = os.path.join(folder_path, img_file_name)
                img.save(img_file_path)

                print(f"Found img {image_index} saved to {folder_path}")
                image_index += 1

    print("All images saved successfully.")

# Main function
def main():
    pptx_file_name = input("Enter the name of the PPTX file (including extension) saved in Google Drive: ")
    pptx_path = download_pptx_file(pptx_file_name)

    folder_path = create_image_folder(pptx_file_name)
    extract_and_save_images(pptx_path, folder_path)

# Execute main function
main()
```
````

## **PROCESS: 2 \[Compilation-WEEKLY]**

<details>

<summary>Under Development:</summary>

Will be added soon!

</details>

## **PROCESS: 3 \[Magazine-Monthly]**

### MCQ FORMATTING

````python
```notebook-python
!pip install python-docx
from google.colab import drive
import os
from docx import Document

# Authenticate and mount Google Drive
drive.mount('/content/drive')

# Function to remove Hindi text from a paragraph
def remove_hindi_text(paragraph):
    hindi_chars = set("अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ च छ ज झ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ा ि ी ु ू ृ ॅ े ै ो ौ ्".split())
    for run in paragraph.runs:
        text = run.text.split('/')
        if len(text) > 1 and any(char in hindi_chars for char in text[1]):
            run.text = text[0] + '/'

# Function to remove Hindi text from the document
def remove_hindi_from_docx(docx_file):
    doc = Document(docx_file)
    for paragraph in doc.paragraphs:
        remove_hindi_text(paragraph)
    doc.save(docx_file)

# Input file name
file_name = input("Enter the file name: ")

# Path to the file
file_path = os.path.join("/content/drive/My Drive/", file_name)

# Remove Hindi text from the document
remove_hindi_from_docx(file_path)

print("Hindi text removed and document saved successfully.")
```
````
