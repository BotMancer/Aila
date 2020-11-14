# Setting up environment

So, if you are here i think is because you want to *self-host* Aila by yourself, so let's take a look at what you need:

## Dependencies
- discord.js:  
  `npm install discord.js`
- dotenv:  
  `npm install dotenv`
- mongoose:  
  `npm install mongoose`
- module-alias:  
  `npm install module-alias`

## Files
- **.env** file - This file is for environment variables, basically that variables you want to keep secret, like Bot Token, Keys ecc.
    
    - First Step: Create your **.env** file and put it in the Bot's main directory. 
    
    - Second Step: Actually add your *Top-Secret* variables. For example:
      ```
      BOT_TOKEN=YOUR_BOT_TOKEN_HERE
      DB_USER=YOUR_DB_USERNAME
      DB_PASS=YOUR_DB_PASSWORD
      ```
      This is the base .env configuration, if you want to modify feel free to do it. 



    