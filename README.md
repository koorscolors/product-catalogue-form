# product-catalogue-form
 Using Google Forms and Google Sheets as the backend to intake responses via a basic product catalogue. This project replaces Google Forms UI with a custom UI. 

 In order to reproduce this, take the following actions:
 1. Set up a new Google Form, along with all questions.
 2. In the Forms dropdown menu (⋮), select 'get pre-filled link'.
 3. Fill out all questions with any response, and after 'get link' select: 'Copy Link'.
 4. Past this information into a text file.
 5. In the index file of this project, in the 'form action' field, use the copied form link. Note, replace "viewform?usp=pp_url" with "formResponse".
 6. For any 'input', replace the 'name' value with the corresponding value from the copied form link. For example 'entry.1655467392'.
 7. Once 1-6 above are complete, any form responses should submit directly to the Google Form and corresponding Sheet if configured. 
