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
            run.text = text[0].strip()
        else:
            run.text = run.text.strip()

# Function to remove bulleted list but preserve numbered list
def remove_bulleted_list(paragraph):
    if paragraph.style.name.startswith('List Bullet'):
        paragraph.clear()

# Function to remove Hindi text and bulleted list from the document
def clean_docx(docx_file):
    doc = Document(docx_file)
    for paragraph in doc.paragraphs:
        remove_hindi_text(paragraph)
        remove_bulleted_list(paragraph)
    doc.save(docx_file)

# Input file name
file_name = input("Enter the file name: ")

# Path to the file
file_path = os.path.join("/content/drive/My Drive/", file_name)

# Clean the document
clean_docx(file_path)

print("Hindi text and bulleted list removed, and document saved successfully.")
