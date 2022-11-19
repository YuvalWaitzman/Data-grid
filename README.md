# Data grid UI
 
 ## Description
 This project's purpose was done for the usage of the SRE team in Qwilt (my former company),
 and under the suprvision of the frontend team in the company.
 The GUI main goal is to conveniently display all customers Qwilt is working with,
 and some relevant information about them in a designated grid.
 One of the main demands was to indicate the SRE team about certificates that are going to expire.
 According to their classifying preferences,
 each record indicates about its status and urgency with the right color.
    
  ## Technologies
  * JavaScript
  * React.js
  * CSS (styled components)
  * Ag-grid library
  * Ant Design library
  
  ## Workflow
  - The user clicks on the ling of the UI and been directed to the app.
  - A GET request is sent to the api (AWS) - json file is extracted in a promise based asynchronous call.
  - The grid is displayed on the screen in  it's base state, all the records are presented.
  - The user can filter, sort, change the order of columns and choose the relevant data he want to see on the
    screen. Also, the ability to choose customers
    according to level of urgency (certificate expiration
    aspect) is enabled. All of the required features are
    enabled with the AG gris library, and presented
    immediately on the screen once triggering the change.
  - Customers might have multiple certificates with differrent expiration dates. Therefore, the certificate in the worst status (least days to expire) will determine the color in the main grid. Then, the user can click on a designated button and open the detail grid - which will contain all the certificates and their expiration dates (one record for each certificate).
    
    
  

