// Helper function that gets returns array of features
const getFeatures = async () => {
  const features = await axios.get('/featureIndex');
  const featureList = [];
  features.data.forEach((feature) => {
    featureList.push(feature.name);
  });
  return featureList;
};

const rootBtn = document.getElementById('rootBtn');
const colBugForm = document.getElementById('createBugFormCol');
const colFeatureForm = document.getElementById('createFeatureFormCol');
// const colBugList = document.getElementById('bugListCol');
const bugTableBody = document.getElementById('bugTable');

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
