# Sports

In our weekly compilation RAW files, we've collected the sports data in date wise order, but our aim is to display it in a easy to remember format for students hence it is necessary to group the headlines of sports news based on their sport types.

We're using AI for Grouping Sports as per Category:

## STEP 1:

* Create a new Google docs file for this sport's categorisation task.
* Rename this file to: SPORTS-DATA-CATEGORIZED-MONTH
* Collect sports specific data from all 4 week's compilation's raw file.

## STEP 2:

* Now only select the headings of each sports news from all data in this file.
* Paste these headings on the first page of this file.
* Now manually type the sports name in front of each heading separated by a dash '-'. (example: CRICKET - This is a sample cricket heading)
* Copy the Prompt mentioned below and paste it into a new chat in ChatGPT.

{% hint style="info" %}
PROMPT&#x20;
{% endhint %}

```
Task Overview:
You will be given a list of sports news headlines, with the sport type either mentioned at the beginning of the headline or inferred from the content. Your task is to:
1. Group the headlines by sport type.
2. Identify and assign sport types to headlines where the sport type is not explicitly mentioned.
3. Highlight any headlines that could not be categorized or where the sport type is ambiguous.
4. Rearrange the headlines in a new order based on their sport type grouping.

 Input Format:
- Each headline may or may not start with a sport type. If the sport type is provided, it will be formatted as:  
  `SPORT-TYPE - HEADLINE`
- Example:  
  `CRICKET - Former India Wicket Keeper Dinesh Karthik Appointed as SA20 League Ambassador`

 Output Requirements:
1. Group Headlines: Group all headlines that belong to the same sport type together.
2. Assign Sport Types: If a headline does not explicitly mention a sport type, infer it from the content and categorize it accordingly.
3. Highlight Uncategorizable Headlines: If a headline cannot be categorized, list it at the end under a separate section titled "Uncategorized Headlines."
4. General Event News: For headlines related to events or tournaments that span multiple sports, list them at the very end under "General Sports News."

 Error Handling:
- Unrecognized Sport Types: If a sport type is provided but does not match any known sport, list it under "Uncategorized Headlines."
- Ambiguous Headlines: If a headline’s sport type cannot be determined due to ambiguity, list it under "Uncategorized Headlines."

Understand by an Example:
Input:
CRICKET - Former India Wicket Keeper Dinesh Karthik Appointed as SA20 League Ambassador
India to Host 2025 Men’s Asia Cup in T20 Format
TENNIS - Indian Tennis Legend Rohan Bopanna Retires After Paris 2024 Olympics Exit
Shivam shot a massive dunk in the world record history.
PARA SWIMMER - Jia Rai: Youngest & Fastest Para-Swimmer to Cross the English Channel
BOXING - Lt Col Kabilan Sai Ashok, India’s Youngest Boxing Referee At Olympics

Expected Output:
CRICKET
- Former India Wicket Keeper Dinesh Karthik Appointed as SA20 League Ambassador
TENNIS
- Indian Tennis Legend Rohan Bopanna Retires After Paris 2024 Olympics Exit
PARA SWIMMER
- Jia Rai: Youngest & Fastest Para-Swimmer to Cross the English Channel
BOXING
- Lt Col Kabilan Sai Ashok, India’s Youngest Boxing Referee At Olympics
GENERAL SPORTS NEWS
- India to Host 2025 Men’s Asia Cup in T20 Format
Uncategorized Headlines
- Shivam shot a massive dunk in the world record history.
```

## STEP 3:

Now copy the sports headings and give the input to AI.

You'll receive a grouped data of sports news based on which you'll arrange the data in grouped format.

This will be used for Final Design Work.&#x20;

#### WATCH VIDEO GUIDE

{% embed url="https://drive.google.com/file/d/12m3zF7-ihZfU_39QYpL6WnTH8pGi1Gq1/view?usp=drive_link" %}
