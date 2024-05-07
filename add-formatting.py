from google.colab import auth
from googleapiclient.discovery import build
from datetime import datetime

# Authenticate user
auth.authenticate_user()

# Define function to remove specified data from document
def remove_data_from_document(doc_id):
    # Build Google Docs API service
    service = build('docs', 'v1')

    # Retrieve updated content to replace old content
    updated_content = build_updated_content(doc_id)

    # Create a new Google Docs file
    new_doc_id = create_google_doc()

    # Update new document with modified content
    service.documents().batchUpdate(
        documentId=new_doc_id,
        body={'requests': [
            {'insertText': {'location': {'index': 1}, 'text': '\n\n'.join(updated_content)}}  # Insert updated content
        ]}
    ).execute()

    return new_doc_id

# Function to create a new Google Docs file
def create_google_doc():
    service = build('docs', 'v1')
    today = datetime.today().strftime('%d-%m-%Y')
    document = {'title': f'UPDATED-{today}-NewsletterRAW'}
    doc = service.documents().create(body=document).execute()
    return doc['documentId']

# Function to check if text is in Hindi
def is_hindi(text):
    hindi_chars = [chr(i) for i in range(2304, 2432)]  # Unicode range for Hindi characters
    return any(char in hindi_chars for char in text)

# Function to build updated content from document content
def build_updated_content(doc_id):
    # Build Google Docs API service
    service = build('docs', 'v1')

    # Retrieve current content of the document
    document = service.documents().get(documentId=doc_id).execute()
    content = document.get('body').get('content')

    # Iterate through content and remove specified data
    updated_content = []
    for element in content:
        if 'paragraph' in element:
            paragraph = element['paragraph']
            if 'elements' in paragraph:
                updated_elements = []
                for element in paragraph['elements']:
                    if 'textRun' in element:
                        text = element['textRun']['content']
                        if 'Kapil Kathpal' not in text and not is_hindi(text):
                            updated_elements.append(element)
                if updated_elements:
                    updated_paragraph = {'paragraph': {'elements': updated_elements}}
                    updated_content.append(updated_paragraph)
        elif 'table' in element:
            updated_content.append(element)  # Keep tables unchanged

    # Build updated content
    text = []
    for element in updated_content:
        if 'paragraph' in element:
            paragraph_text = ''
            for sub_element in element['paragraph']['elements']:
                if 'textRun' in sub_element:
                    paragraph_text += sub_element['textRun']['content']
            if paragraph_text.strip():  # Skip empty lines
                text.append(paragraph_text.strip())  # Trim whitespace and append
    return text

# Main function
def main():
    doc_id = input("Enter the document ID of the Google Docs file: ")
    new_doc_id = remove_data_from_document(doc_id)
    print(f"Data removal completed successfully. New document created with ID: {new_doc_id}")

# Execute main function
main()
