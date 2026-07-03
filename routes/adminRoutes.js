const express = require("express");

module.exports = (db) => {

    const router = express.Router();

    router.get("/", async (req, res) => {

        const contacts = await db.all(`
            SELECT *
            FROM contacts
            ORDER BY created_at DESC
        `);

        let html = `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>Portfolio Admin</title>

<style>

body{

background:#0d1117;
color:white;
font-family:Arial;
padding:40px;

}

table{

width:100%;
border-collapse:collapse;

}

th,td{

padding:14px;
border:1px solid #333;

}

th{

background:#e8293b;

}

tr:nth-child(even){

background:#1b1b1b;

}

h1{

margin-bottom:25px;

}

</style>

</head>

<body>

<h1>📩 Portfolio Messages</h1>

<table>

<tr>

<th>Name</th>
<th>Email</th>
<th>Message</th>
<th>Date</th>

</tr>
`;

        contacts.forEach(contact => {

            html += `

<tr>

<td>${contact.name}</td>

<td>${contact.email}</td>

<td>${contact.message}</td>

<td>${contact.created_at}</td>

</tr>

`;

        });

        html += `

</table>

</body>

</html>

`;

        res.send(html);

    });

    return router;

};