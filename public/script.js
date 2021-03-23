// Helper function that gets returns array of features
const getFeatures = async () => {
  const features = await axios.get('/featureIndex');
  const featureList = [];
  features.data.forEach((feature) => {
    featureList.push(feature.name);
  });
  return featureList;
};

// Make the main container
const mainContainer = document.createElement('div');
mainContainer.classList.add('container', 'mt-4');
document.body.appendChild(mainContainer);

// Add all the rows
const bugFormRow = document.createElement('div');
const featureFormRow = document.createElement('div');
const bugListRow = document.createElement('div');
bugFormRow.classList.add('row', 'row_grey');
featureFormRow.classList.add('row', 'row_grey');
bugListRow.classList.add('row', 'row_grey');

// Add row titles
const bugFormTitle = document.createElement('h1');
const featureFormTitle = document.createElement('h1');
const bugListTitle = document.createElement('h1');
bugFormTitle.innerText = 'Create Bug Form';
featureFormTitle.innerText = 'Create Feature Form';
bugListTitle.innerText = 'Bugs List';

// Add all the cols
const colBugForm = document.createElement('div');
const colFeatureForm = document.createElement('div');
const bugListCol = document.createElement('div');
colBugForm.classList.add('col');
colFeatureForm.classList.add('col');
bugListCol.classList.add('col');

// Append rows and row titles
mainContainer.appendChild(bugFormRow);
mainContainer.appendChild(featureFormRow);
mainContainer.appendChild(bugListRow);
bugFormRow.appendChild(bugFormTitle);
bugFormRow.appendChild(colBugForm);
featureFormRow.appendChild(featureFormTitle);
featureFormRow.appendChild(colFeatureForm);
bugListRow.appendChild(bugListTitle);
bugListRow.appendChild(bugListCol);

// add button for bug form
const rootBtn = document.createElement('button');
rootBtn.classList.add('btn', 'btn-primary');
rootBtn.innerText = 'Create a Bug';
colBugForm.appendChild(rootBtn);

const bugTable = document.createElement('table');
bugTable.classList.add('table');
const bugTableHead = document.createElement('thead');
const bugTableBody = document.createElement('tbody');
bugListCol.appendChild(bugTable);
bugTable.appendChild(bugTableHead);
bugTable.appendChild(bugTableBody);
const bugTableHeadTr = document.createElement('tr');
bugTableHead.appendChild(bugTableHeadTr);
['#', 'Problem', 'Text', 'Feature'].forEach((column) => {
  const colth = document.createElement('th');
  colth.innerText = column;
  colth.scope = 'col';
  bugTableHeadTr.appendChild(colth);
});

rootBtn.addEventListener('click', async () => {
  console.log('Button clicked');

  // Create DOM elements
  const form = document.createElement('div');
  const problemInput = document.createElement('input');
  const errorTxtInput = document.createElement('input');
  const commitInput = document.createElement('input');
  const featureInput = document.createElement('select');
  const errorDiv = document.createElement('div');
  const submitBtn = document.createElement('button');

  // Array of DOM elements
  const objects = [problemInput, errorTxtInput, commitInput, featureInput, submitBtn];
  const names = ['problem', 'error', 'commit', 'feature', 'submit'];
  const options = await getFeatures();
  console.log(options);

  // Loop to set attributes of DOM elements
  for (let i = 0; i < names.length; i += 1) {
    objects[i].classList.add('form-control', 'my-4');
    objects[i].placeholder = names[i];
    form.appendChild(objects[i]);
    objects[i].name = names[i];
  }

  for (let i = 0; i < options.length; i += 1) {
    const optionEle = document.createElement('option');
    optionEle.innerText = options[i];
    optionEle.value = i + 1;
    featureInput.appendChild(optionEle);
  }
  // Stuff unique to button
  submitBtn.classList.add('btn', 'btn-primary');
  submitBtn.innerText = 'submit';
  form.appendChild(errorDiv);

  // Submit form button
  submitBtn.addEventListener('click', async () => {
    try {
      // do some validation
      for (let i = 0; i < objects.length - 1; i += 1) {
        if (objects[i].value === '') {
          throw `BlankField-${names[i]}`;
        }
      }
      // prepare data
      const data = {
        problem: problemInput.value,
        errorText: errorTxtInput.value,
        commit: commitInput.value,
        featureId: featureInput.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log(data);
      // submit data
      errorDiv.classList.add('submitText');
      errorDiv.innerText = 'Submitted!';
      const result = await axios.post('/create', data);
      console.log(result.config.data);
    } catch (error) {
      console.log(error);
      if (error.includes('BlankField')) {
        errorDiv.classList.add('errorText');
        const incompleteField = error.split('-');
        errorDiv.innerText = `Please fill up ${incompleteField[1]}`;
      }
    }
  });

  // Add form to page
  colBugForm.appendChild(form);
});

// Comfortable: retrieve list of bugs
const genBuglist = async () => {
  const bugList = await axios.get('/bugsIndex');
  console.log(bugList.data);
  bugList.data.forEach((bug) => {
    console.log(`---- ${bug.id} ----`);
    console.log(bug.problem);
    console.log(bug.errorText);
  });
  return bugList.data;
};

let bugList;
(async () => {
  bugList = await genBuglist();
  console.log('bug list: ', bugList);
  console.log('about to run foreach');
  bugList.forEach((bug) => {
    const bugRow = document.createElement('tr');
    const bugColumns = ['id', 'problem', 'errorText', 'feature'];
    bugColumns.forEach((column) => {
      const rowItem = document.createElement('td');
      rowItem.innerHTML = bug[column];
      if (column === 'feature') {
        rowItem.innerHTML = bug[column].name;
      }
      bugRow.appendChild(rowItem);
    });
    bugTableBody.appendChild(bugRow);
  });
})();
