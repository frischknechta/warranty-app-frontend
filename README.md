# Warranty registration app - Frontend

---

## Introduction

This project is simple warranty registration and warranty check app.

On the registration page, user must enter the product reference which is immediately verified and validated or refused.
If the reference is correct, the picture of the product is diplayed.
<img src="/public/Valid REF.png" width="300" >

If the reference is incorrect, the form cannot be submited.
<img src="/public/Invalid REF.png" width="300"  >

The other fields are not verified but mendatory, the date cannot be in the future.

On the check page, user must enter product reference and serial number.
If product is found in data base, the product and warranty information is displayed below the form, else an error message is displayed.

<img src="/public/Warranty check.png" width="300" >

---

## Installation

```
#Clone the repository
git clone https://github.com/frischknechta/warranty-app-frontend.git

#Go in the repository
cd warranty-app-frontend

#Install dependencies
yarn

#Start a local dev server
yarn dev
```

---

## Use

The datas used for reference validation are stored in `productsData.json`.
This can alternatively be configurated with a distant data source in `Register.jsx`.

---

## Backend

The backend for this project can be found in this [repo](https://github.com/frischknechta/personal-projects-backend)
