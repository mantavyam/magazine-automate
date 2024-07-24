# Install necessary libraries
!pip install --quiet google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client google-colab

from google.colab import auth
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaFileUpload
import io
from datetime import datetime

# Authenticate and create the API client
auth.authenticate_user()

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# Define the scopes and initialize the Drive and Docs API clients
SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']

creds = None

# Authenticate and initialize API clients
if creds and creds.expired and creds.refresh_token:
    creds.refresh(Request())
else:
    flow = InstalledAppFlow.from_client_secrets_file('/content/drive/My Drive/credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)

drive_service = build('drive', 'v3', credentials=creds)
docs_service = build('docs', 'v1', credentials=creds)

# Function to get the content of a Google Docs file
def get_doc_content(doc_id):
    doc = docs_service.documents().get(documentId=doc_id).execute()
    return doc

# Function to create a new Google Docs file
def create_doc(title):
    doc = docs_service.documents().create(body={'title': title}).execute()
    return doc['documentId']

# Function to append content to a Google Docs file
def append_content(doc_id, requests):
    docs_service.documents().batchUpdate(documentId=doc_id, body={'requests': requests}).execute()

# Get user input
num_newsletters = int(input("Enter the number of newsletters to merge: "))
newsletter_ids = []

for i in range(num_newsletters):
    newsletter_id = input(f"Enter the Google Doc ID for newsletter {i+1}: ")
    newsletter_ids.append(newsletter_id)

# Get the current month and year for the compilation title
current_date = datetime.now()
month_year = current_date.strftime("%B-%Y")
compilation_title = f"WK-COMPILE-{month_year}"

# Create a new Google Docs file for the weekly compilation
compilation_doc_id = create_doc(compilation_title)

# Append the title to the compilation document
requests = [
    {
        'insertText': {
            'location': {
                'index': 1,
            },
            'text': f"{compilation_title}\n"
        }
    },
    {
        'updateParagraphStyle': {
            'range': {
                'startIndex': 1,
                'endIndex': len(compilation_title) + 1,
            },
            'paragraphStyle': {
                'alignment': 'CENTER'
            },
            'fields': 'alignment'
        }
    }
]

# Step 2: Append MCQ Qs section
requests.append({'insertText': {'location': {'index': 1}, 'text': "MCQ Qs\n"}})
requests.append({'updateParagraphStyle': {'range': {'startIndex': 1, 'endIndex': 8}, 'paragraphStyle': {'alignment': 'START'}, 'fields': 'alignment'}})

for newsletter_id in newsletter_ids:
    doc_content = get_doc_content(newsletter_id)
    newsletter_title = doc_content.get('title')
    
    requests.append({'insertText': {'location': {'index': 1}, 'text': f"{newsletter_title}\n"}})
    requests.append({'updateParagraphStyle': {'range': {'startIndex': 1, 'endIndex': len(newsletter_title) + 1}, 'paragraphStyle': {'alignment': 'START'}, 'fields': 'alignment'}})

    for element in doc_content.get('body').get('content'):
        table = element.get('table')
        if table and len(table.get('tableRows')) == 6 and len(table.get('tableRows')[0].get('tableCells')) == 2:
            for row in table.get('tableRows'):
                for cell in row.get('tableCells'):
                    for content in cell.get('content'):
                        for text_run in content.get('paragraph').get('elements'):
                            text = text_run.get('textRun').get('content')
                            requests.append({'insertText': {'location': {'index': 1}, 'text': text}})

# Step 3: Append TIMELINE section
requests.append({'insertText': {'location': {'index': 1}, 'text': "TIMELINE\n"}})
requests.append({'updateParagraphStyle': {'range': {'startIndex': 1, 'endIndex': 9}, 'paragraphStyle': {'alignment': 'START'}, 'fields': 'alignment'}})

for newsletter_id in newsletter_ids:
    doc_content = get_doc_content(newsletter_id)
    newsletter_title = doc_content.get('title')
    
    requests.append({'insertText': {'location': {'index': 1}, 'text': f"{newsletter_title}\n"}})
    requests.append({'updateParagraphStyle': {'range': {'startIndex': 1, 'endIndex': len(newsletter_title) + 1}, 'paragraphStyle': {'alignment': 'START'}, 'fields': 'alignment'}})

    for element in doc_content.get('body').get('content'):
        paragraph = element.get('paragraph')
        if paragraph and paragraph.get('paragraphStyle').get('namedStyleType') == 'HEADING_2':
            for text_run in paragraph.get('elements'):
                text = text_run.get('textRun').get('content')
                requests.append({'insertText': {'location': {'index': 1}, 'text': text}})

# Step 4: Append HIGHLIGHTS and WEEKLY COMPILATION sections
requests.append({'insertText': {'location': {'index': 1}, 'text': "HIGHLIGHTS\n"}})
requests.append({'insertText': {'location': {'index': 1}, 'text': "WEEKLY COMPILATION\n"}})

# Step 5: Append the main content excluding the MCQ table
for newsletter_id in newsletter_ids:
    doc_content = get_doc_content(newsletter_id)
    skip_table = False

    for element in doc_content.get('body').get('content'):
        table = element.get('table')
        if table and len(table.get('tableRows')) == 6 and len(table.get('tableRows')[0].get('tableCells')) == 2:
            skip_table = True
            continue
        
        if skip_table and element.get('paragraph'):
            skip_table = False
        
        if not skip_table:
            requests.append({'insertText': {'location': {'index': 1}, 'text': element.get('paragraph').get('elements')[0].get('textRun').get('content')}})

# Apply the changes to the compilation document
append_content(compilation_doc_id, requests)

print(f"Weekly compilation created: {compilation_title}")

# Output the link to the document
print(f"Document link: https://docs.google.com/document/d/{compilation_doc_id}/edit")
