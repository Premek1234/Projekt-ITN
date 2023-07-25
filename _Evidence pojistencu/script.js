class Insured {
    constructor(name, surname, address, age, insuranceNumber) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.age = age;
        this.insuranceNumber = insuranceNumber;
    }
}

function addInsured() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const addressInput = document.getElementById('address');
    const ageInput = document.getElementById('age');
    const insuranceNumberInput = document.getElementById('insuranceNumber');

    const name = nameInput.value;
    const surname = surnameInput.value;
    const address = addressInput.value;
    const age = parseInt(ageInput.value);
    const insuranceNumber = insuranceNumberInput.value;

    if (name.trim() === '' || surname.trim() === '' || address.trim() === '' || isNaN(age) || insuranceNumber.trim() === '') {
        alert('Prosím vyplňte všechna pole správně.');
        return;
    }

    const newInsured = new Insured(name, surname, address, age, insuranceNumber);

    let insuredList = JSON.parse(localStorage.getItem('insuredList')) || [];
    insuredList.push(newInsured);
    localStorage.setItem('insuredList', JSON.stringify(insuredList));

    showInsuredList();
    alert('Pojištěnec byl úspěšně přidán.');
    nameInput.value = '';
    surnameInput.value = '';
    addressInput.value = '';
    ageInput.value = '';
    insuranceNumberInput.value = '';
}

function showInsuredList() {
    let insuredList = JSON.parse(localStorage.getItem('insuredList')) || [];
    const tableElement = document.getElementById('insuredTable');

    tableElement.innerHTML = `
        <tr>
            <th colspan="2">Jméno a Příjmení</th>
            <th>Adresa</th>
            <th>Věk</th>
            <th>Číslo pojištěnce</th>
            <th>Akce</th>
        </tr>
    `;

    insuredList.forEach((insured, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${insured.name}</td>
            <td>${insured.surname}</td>
            <td>${insured.address}</td>
            <td>${insured.age}</td>
            <td>${insured.insuranceNumber}</td>
            <td><button onclick="removeInsured(${index})">Odstranit</button></td>
        `;
        tableElement.appendChild(row);
    });
}

function removeInsured(index) {
    let insuredList = JSON.parse(localStorage.getItem('insuredList')) || [];

    if (index >= 0 && index < insuredList.length) {
        insuredList.splice(index, 1);
        localStorage.setItem('insuredList', JSON.stringify(insuredList));
        showInsuredList();
    }
}

// Zobrazení seznamu při načtení stránky
showInsuredList();