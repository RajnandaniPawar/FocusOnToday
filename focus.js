const checkBoxList = document.querySelectorAll(".custom-checkbox");
const allInput = document.querySelectorAll('.goal-input');
const errorLable = document.querySelector('.error-label');
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');

const allGoalQuotes = [
   'Raise the bar by completing your goals!',
   'Well begun is half done!',
   'Just a step away, keep going!',
   'Whoa! You just completed all the goals, time for chill : D'
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
   first: {
      name: '',
      completed: false,
   },
   second: {
      name: '',
      completed: false,
   },
   third: {
      name: '',
      completed: false,
   }
};

let completedAllCount = Object.values(allGoals).filter( (goal) => goal.completed).length

progressValue.style.width = `${completedAllCount/ 3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedAllCount} / 3 completed`;
// progressLabel.innerText = allGoalQuotes[completedAllCount];

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
 
     const addGoals = [...allInput].every(function(input){
        return input.value;
     });  

     if(addGoals){
        checkbox.parentElement.classList.toggle('completed');

        const inputId = checkbox.nextElementSibling.id;console.log(inputId);

        allGoals[inputId].completed = !allGoals[inputId].completed;

        completedAllCount = Object.values(allGoals).filter( (goal) => goal.completed).length; 

        progressValue.style.width = `${completedAllCount / 3 * 100}%`
        progressValue.firstElementChild.innerText = `${completedAllCount} / 3 completed`;
      //   progressLabel.innerText = allGoalQuotes[completedAllCount];
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
     }else{
        progressBar.classList.add('show-error')
     } 
    });
       
});

allInput.forEach((input) => {

   input.value = allGoals[input.id].name;
   if(allGoals[input.id].completed){
      input.parentElement.classList.add('completed');
   }

   input.addEventListener('focus', ()=>{
      progressBar.classList.remove('show-error');
   })
     
   input.addEventListener('input', (e) => {     
   if(allGoals[input.id].completed){
      input.value = allGoals[input.id].name;
      return ;
   }

   allGoals[input.id].name = input.value;
   
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
   })


  
  
});
