function Agile() {
	this.backlog = []; 							// функция-конструктор беклога
};

Agile.prototype = {
	addTask: function(task) {
		this.backlog.push(task); 				// добавляем задачу в конец массива
	},
	addUrgentTask: function(urgentTask) {
		this.backlog.unshift(urgentTask); 		// добавляем срочную задачу в начало массива
	},
	getSprint: function(storyPoints) {
		var currentStoryPoints = storyPoints; 	// для хранения остатка sp, который можно использовать в заданном спринте
		var sprint = []; 						// массив для хранения задач спринта
		var backlogWithoutSprint = []; 			// массив для хранения задач из беклога, не вошедших в этот спринт
		var currentElement; 					// для хранения текущей задачи

		// проверка, что у нас еще есть остаток sp, который можем использовать: если все sp "израсходованы", то цикл не пробегаем; 
		// забираем текущую задачу из беклога (пока в беклоге есть задачи) и рассматриваем ее в теле цикла:
		while ((currentStoryPoints > 0) && (currentElement = this.backlog.shift())) { 
			if (currentElement.storyPoints > currentStoryPoints) {  // если задача не "влезает" в остаток sp, 
				backlogWithoutSprint.push(currentElement);			// то передаем ее в массив для хранения задач, не вошедших в спринт;
			} else {												// а если задача "влезает",
				currentStoryPoints -= currentElement.storyPoints;	// то уменьшаем остаток на количество sp рассматриваемой задачи 
				sprint.push(currentElement);						// и берем ее в спринт
			};
		};

		// это неведомая магия с последнего занятия;
		// объединяем массив с задачами, не вошедшими в спринт, 
		// с остатками беклога (с задачами, не вошедшими с спринт из-за того, что все заданные sp были "израсходованы" до них);
		// может, тут надо было добавить filter(Boolean), как на занятии, 
		// но я не особо поняла, как он работает и нужен ли он здесь, решила не рисковать
		this.backlog = [].concat(backlogWithoutSprint, this.backlog);
		return sprint;
	},
}; 

function Task(title, storyPoints) {				//функция-конструктор задач
	this.title = title;
	this.storyPoints = storyPoints;
};

var agile = new Agile();
