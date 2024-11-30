# Important Days

## STEP BY STEP APPROACH

### STEP 1: Create a new <.docx> containing only Headlines&#x20;

### STEP 2: Verify that Headline includes Date

#### Qs: What if there is no date mentioned in the headline?

Find it

### STEP 3: AI Prompt to Organise Dates in Sequence

Create a new chat and copy this prompt to give command to AI

{% hint style="info" %}
## PROMPT
{% endhint %}

{% code fullWidth="false" %}
```
UNDERSTAND:
As per English Calendar Months when arranged in ascending order:
January - 31 days
February - 28 or 29 days (leap year)
March - 31 days
April - 30 days
May - 31 days
June - 30 days
July - 31 days
August - 31 days
September - 30 days
October - 31 days
November - 30 days
December - 31 days
Also, Dates of Month when arranged in ascending:
1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31.

ANALYSE:
You've to identify the date/week/month/year from a list of statements containing facts related to Important days or events.
Example:
Martyrs Day or Shaheed Diwas 2024 on January 30th
Date Identified - 30 January
World Interfaith Harmony Week 2024 celebrated during 1-7 February
Week Identified - 1-7 February
Mantavyam India declares March as "Month of Game Development"
Month Identified - March
Indian Navy Declares 2024 As ‘Year of Naval Civilians’
Year Identified - 2024

TASK TO BE PERFORMED:
You'll be given a list of statements containing facts related to Important days or events.
Iterate through each sentence one by one
︎
Identify the date/week/month/year

Put the date/week/month/year before "-"

Add dash "-" at the end of date/week/month/year.

Understand by Examples:
CASE 1: Only one date
RAW: Martyrs Day or Shaheed Diwas 2024 on January 30th
RE-FRAMED: 30 January - Martyrs Day or Shaheed Diwas 2024 on January 30th

CASE 2: Set of Days Range or Week
RAW: World Interfaith Harmony Week 2024 celebrated during 1-7 February
RE-FRAMED: 1-7 February - World Interfaith Harmony Week 2024

CASE 3: Whole Year or Whole Month
RAW:
1(For Year). Indian Navy Declares 2024 As ‘Year of Naval Civilians’.
2(For Month). Mantavyam India declares March as "Month of Game Development".
RE-FRAMED:
1(For Year). 2024 - Indian Navy Declares 2024 As ‘Year of Naval Civilians’
2(For Month). MARCH - Mantavyam India declares March as "Month of Game Development".

There may be some exceptional cases as mentioned below:

EXCEPTION CASE 1: No specific date mentioned
RAW: Holi is celebrated annually on 2nd Monday of march every year.
RE-FRAMED: 2nd Monday of MARCH - Holi is celebrated annually on 2nd Monday of march every year.

EXCEPTION CASE 2: Missing Data [date/week/month/year]
If you can't identify any data to be reframed then mention it as exception saying, "Unable to Identify".

SORTING:
The raw data You'll be given is not sorted properly, so you've to Sort the reframed sentences in the order of first date comes first.
Understand by an example of raw data:
Indian Coast Guard Day 2024 Every year on February 1st
World Neglected Tropical Diseases Day 2024- January 30
World Leprosy Day 2024- January 28
World Wetlands Day is observed annually on February 2

Example of sorted and re-framed data:
28 JANUARY - World Leprosy Day 2024- January 28
30 JANUARY - World Neglected Tropical Diseases Day 2024- January 30
01 FEBRUARY - Indian Coast Guard Day 2024 Every year on February 1st
02 FEBRUARY - World Wetlands Day is observed annually on February 2

ATTENTION:
While re-framing the sentence always put the date/week/month/year at the start of sentence.
All dates of Month in this format: Date followed by Month (Don't alter it).
Example: Suppose you Identified July 27 then statement:
27 July - "Statement".

WHAT IS EXPECTED?
Output in yaml.
Top Priority tasks:
Re-framing as instructed above.
Sorting the reframed sentences in ascending.

Second Priority tasks:
At the top Mention the count of total statements you are given.
At the end of process mention total statements formatted.
At the end, also Mention list of statements which were not formatted or were missed.

Do you understand how you've to format data?
```
{% endcode %}

### STEP 4: Use Find Tool (CTRL + F) for sequencing dates

### STEP 5: Update the Dates in Final Design &#x20;

#### WATCH VIDEO GUIDE

{% embed url="https://drive.google.com/file/d/1R4LAiCiFA-gHSJgNTvD1uDH2PszRThWz/view?usp=drive_link" %}
