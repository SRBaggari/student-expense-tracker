const startBtn = document.getElementById("startBtn");

const addExpenseBtn =
document.getElementById("addExpenseBtn");

const tableBody =
document.getElementById("expenseTableBody");

const totalExpense =
document.getElementById("totalExpense");

const budgetLeft =
document.getElementById("budgetLeft");

const foodExpense =
document.getElementById("foodExpense");

const tipsBox =
document.getElementById("tipsBox");

const darkModeBtn =
document.getElementById("darkModeBtn");


// Totals

let total = 0;

let foodTotal = 0;


// Monthly Budget

let monthlyBudget = 0;



// Welcome Button

startBtn.addEventListener("click", () => {

    alert("Welcome to Student Expense Tracker!");

});



// Add Expense

addExpenseBtn.addEventListener("click", () => {

    const title =
    document.getElementById("title").value;

    const amount =
    parseInt(document.getElementById("amount").value);

    const category =
    document.getElementById("category").value;


    if(title === "" || isNaN(amount)){

        alert("Please fill all fields");

        return;
    }


    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${title}</td>

        <td>₹${amount}</td>

        <td>${category}</td>

        <td>
            <button
            onclick="deleteExpense(this, ${amount}, '${category}')">
            Delete
            </button>
        </td>
    `;


    tableBody.appendChild(row);


    // Update Totals

    total += amount;

    totalExpense.innerText = `₹${total}`;


    // Update Budget Left

    budgetLeft.innerText =
    `₹${monthlyBudget - total}`;


    // Food Tracking

    if(category === "Food"){

        foodTotal += amount;

        foodExpense.innerText =
        `₹${foodTotal}`;
    }


    // Update Alerts

    updateTips();


    // Update Chart

    updateChart(category, amount);


    // Clear Inputs

    document.getElementById("title").value = "";

    document.getElementById("amount").value = "";

});



// Delete Expense

function deleteExpense(button, amount, category){

    button.parentElement.parentElement.remove();


    total -= amount;

    totalExpense.innerText =
    `₹${total}`;


    budgetLeft.innerText =
    `₹${monthlyBudget - total}`;


    if(category === "Food"){

        foodTotal -= amount;

        foodExpense.innerText =
        `₹${foodTotal}`;
    }


    updateTips();
}



// Set Budget

function setBudget(){

    monthlyBudget =
    parseInt(
    document.getElementById("budgetInput").value
    );


    if(isNaN(monthlyBudget)){

        alert("Please enter budget");

        return;
    }


    // Update Monthly Budget Card

    document.getElementById(
    "monthlyBudgetDisplay").innerText =
    `₹${monthlyBudget}`;


    // Update Budget Left

    budgetLeft.innerText =
    `₹${monthlyBudget - total}`;


    alert("Monthly Budget Set Successfully!");
}



// Smart Alerts & Tips

function updateTips(){


    // Overspending Alert

    if(total > monthlyBudget){

        tipsBox.innerHTML = `
            🚨 Alert! You exceeded your monthly budget!
        `;

        tipsBox.style.background = "#ef4444";

        tipsBox.style.color = "white";


        alert(
        "Warning! You crossed your monthly budget!"
        );
    }


    // Food Expense Alert

    else if(foodTotal > 2000){

        tipsBox.innerHTML = `
            ⚠️ Your food expenses are too high.
            Try reducing online orders.
        `;

        tipsBox.style.background = "#f59e0b";

        tipsBox.style.color = "white";
    }


    // Safe Zone

    else{

        tipsBox.innerHTML = `
            ✅ Great! Your expenses are under control.
        `;

        tipsBox.style.background = "#22c55e";

        tipsBox.style.color = "white";
    }
}



// Chart.js

const ctx =
document.getElementById("expenseChart");


const expenseData = {

    Food: 0,
    Transport: 0,
    Books: 0,
    Entertainment: 0
};



const chart = new Chart(ctx, {

    type: "pie",

    data: {

        labels: [
            "Food",
            "Transport",
            "Books",
            "Entertainment"
        ],

        datasets: [{

            label: "Expenses",

            data: [0, 0, 0, 0],

            backgroundColor: [

                "#2563eb",
                "#22c55e",
                "#f59e0b",
                "#ef4444"
            ]
        }]
    }
});



// Update Chart

function updateChart(category, amount){

    expenseData[category] += amount;


    chart.data.datasets[0].data = [

        expenseData.Food,
        expenseData.Transport,
        expenseData.Books,
        expenseData.Entertainment
    ];

    chart.update();
}



// Dark Mode

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});