assert = chai.assert;

describe('Класс Task', function() {
    it('Создает задачу c полями title и storyPoints', function() {
        var expected = {
            title: 'Задача',
            storyPoints: 5
        };

        assert.deepEqual(new Task('Задача', 5), expected);
    });
});

describe('Класс Agile', function() {
    it('Создается объект с пустым бэклогом (backlog)', function() {
        var expected = {
            backlog: []
        };

        assert.deepEqual(new Agile().backlog, expected.backlog);
    });

    it('Содержит метод addTask', function() {
        assert.isFunction(new Agile().addTask);
    });

    it('Содержит метод addUrgentTask', function() {
        assert.isFunction(new Agile().addUrgentTask);
    });

    it('Метод addTask добавляет задачу в бэклог', function() {
        var expected = {
            backlog: [{
                title: 'Задача',
                storyPoints: 5
            }]
        };

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));

        assert.deepEqual(agile.backlog, expected.backlog);
    });

    it('Метод addUrgentTask добавляет задачу в бэклог', function() {
        var expected = {
            backlog: [{
                title: 'Задача',
                storyPoints: 5
            }]
        };

        var agile = new Agile();

        agile.addUrgentTask(new Task('Задача', 5));

        assert.deepEqual(agile.backlog, expected.backlog);
    });

    it('Метод addTask добавляет задачу в конец беклога', function() {
        var expected = {
            backlog: [
                {
                    title: 'Задача',
                    storyPoints: 5
                },
                {
                    title: 'Ещё Задача',
                    storyPoints: 1
                }
            ]
        };

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addTask(new Task('Ещё Задача', 1));

        assert.deepEqual(agile.backlog, expected.backlog);
    });

    it('Метод addUrgentTask добавляет задачу в начало беклога', function() {
        var expected = {
            backlog: [
                {
                    title: 'Ещё Задача',
                    storyPoints: 1
                },
                {
                    title: 'Задача',
                    storyPoints: 5
                }
            ]
        };

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addUrgentTask(new Task('Ещё Задача', 1));

        assert.deepEqual(agile.backlog, expected.backlog);
    });

    it('Метод addUrgentTask добавит несколько задач в начало беклога', function() {
        var expected = {
            backlog: [
                {
                    title: 'Ого, вот это задача',
                    storyPoints: 6
                },
                {
                    title: 'Ещё Задача',
                    storyPoints: 1
                },
                {
                    title: 'Задача',
                    storyPoints: 5
                }
            ]
        };

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addUrgentTask(new Task('Ещё Задача', 1));
        agile.addUrgentTask(new Task('Ого, вот это задача', 6));

        assert.deepEqual(agile.backlog, expected.backlog);
    });

    it('Содержит метод getSprint', function() {
        assert.isFunction(new Agile().getSprint);
    });

    it('Метод getSprint заберет первую задачу из бэклога', function() {
        var expected = {
            backlog: [
                {
                    title: 'Ещё Задача',
                    storyPoints: 1
                }
            ]
        };

        var expectedSprint = [{
            title: 'Задача',
            storyPoints: 5
        }];

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addTask(new Task('Ещё Задача', 1));

        var sprint = agile.getSprint(5);

        assert.deepEqual(agile.backlog, expected.backlog);
        assert.deepEqual(sprint, expectedSprint);
    });

    it('Метод getSprint заберет несколько первых задач из бэклога', function() {
        var expected = {
            backlog: [
                {
                    title: 'Ого, вот это задача',
                    storyPoints: 6
                }
            ]
        };

        var expectedSprint = [{
            title: 'Задача',
            storyPoints: 5
        }, {
            title: 'Ещё Задача',
            storyPoints: 1
        }];

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addTask(new Task('Ещё Задача', 1));
        agile.addTask(new Task('Ого, вот это задача', 6));

        var sprint = agile.getSprint(6);

        assert.deepEqual(agile.backlog, expected.backlog);
        assert.deepEqual(sprint, expectedSprint);
    });

    it('Метод getSprint пропустит задачу, если она не помещается и возьмет другую', function() {
        var expected = {
            backlog: [
                {
                    title: 'Ого, вот это задача',
                    storyPoints: 6
                }
            ]
        };

        var expectedSprint = [{
            title: 'Задача',
            storyPoints: 5
        }, {
            title: 'Ещё Задача',
            storyPoints: 1
        }];

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addTask(new Task('Ого, вот это задача', 6));
        agile.addTask(new Task('Ещё Задача', 1));

        var sprint = agile.getSprint(6);

        assert.deepEqual(agile.backlog, expected.backlog);
        assert.deepEqual(sprint, expectedSprint);
    });

    it('Метод getSprint возьмет срочную задачу', function() {
        var expected = {
            backlog: [
                {
                    title: 'Задача',
                    storyPoints: 5
                }, {
                    title: 'Ещё Задача',
                    storyPoints: 1
                }
            ]
        };

        var expectedSprint = [{
            title: 'Ого, вот это задача',
            storyPoints: 6
        }];

        var agile = new Agile();

        agile.addTask(new Task('Задача', 5));
        agile.addUrgentTask(new Task('Ого, вот это задача', 6));
        agile.addTask(new Task('Ещё Задача', 1));

        var sprint = agile.getSprint(6);

        assert.deepEqual(agile.backlog, expected.backlog);
        assert.deepEqual(sprint, expectedSprint);
    });
});
