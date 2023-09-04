import pandas as pd
import json
from tqdm import tqdm

# Read the Excel file
def convert_xlsx2json(df, json_file):

    # Create a list to store the formatted data
    formatted_data = []
   
    # Iterate through the rows and create a dictionary for each row
    for index, row in tqdm(df.iterrows()):
        findings = row['findings'].split('\n') # ["Paragraph 1 of findings", "Paragraph 2 of findings", "..."]
        indications = row['indications'].split('\n')
        clinical_impression = row['impressions']
        clinical_impression = clinical_impression.replace('[','\n[').split('\n')
        clinical_impression = [text for text in clinical_impression if len(text.replace(' ', '')) >= 3]

        ai_impression = row['AI_impression']
        ai_impression = ai_impression.replace('[','\n[').split('\n')
        ai_impression = [text for text in ai_impression if len(text.replace(' ', '')) >= 3]

        data = {
            "caseNumber": index + 1,
            "indications": indications,
            "findings": findings, 
            "clinical_impression": clinical_impression,
            "ai_impression": ai_impression
        }
        formatted_data.append(data)

    # Write the formatted data to a JSON file
    with open(json_file, 'w') as f:
        json.dump(formatted_data, f, indent=4)

if __name__ == '__main__':
    # Read the Excel file
    df = pd.read_excel('js/evaluated_data/evaluated_cases.xlsx', engine='openpyxl')
    # convert to json
    convert_xlsx2json(df, 'js/cases.json')
