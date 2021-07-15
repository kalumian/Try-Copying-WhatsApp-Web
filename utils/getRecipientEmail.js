const getRecipientEmail = (users, userLoggedIn) => 
    users?.filter(user => user !== userLoggedIn)[1]


export default getRecipientEmail