function clickOnSidebar(el) {
    $(el).click(function() {
        var next = $(this).next();
        next.css('display') == 'none' ? next.css('display', 'inline') : next.css('display', 'none');
    });
};

function getStudentsTree(arr) {
    for (faculty in arr) {
        var faculty_name = $('<li>', {
            html: '<p>' + faculty.split(',')[0] + '</p>', class: 'faculty', id: faculty.split(',')[1]
        }).appendTo('.sidebar > div > ul');
        var faculty_ul = $('<ul>').appendTo(faculty_name);

        for (course in arr[faculty]) {
            var course_name = $('<li>', {
                html: '<p>' + course.split(',')[0] + '</p>', class: 'course', id: course.split(',')[1]
            }).appendTo(faculty_ul);
            var course_ul = $('<ul>').appendTo(course_name);

            for (group in arr[faculty][course]) {
                var group_name = $('<li>', {
                    html: '<p>' + group.split(',')[0] + '</p>', class: 'group', id: group.split(',')[1]
                }).appendTo(course_ul);
                var group_ul = $('<ul>').appendTo(group_name);

                for (student in arr[faculty][course][group]) {
                    $('<li>', {
                        html: '<p>' + arr[faculty][course][group][student].split(',')[0] + '</p>', class: 'student', 
                        id: arr[faculty][course][group][student].split(',')[1]
                    }).appendTo(group_ul);
                }
            }
        }
    }
}

//TODO: Сделать класс Сущность

$(function() {
    //Получение StudentTree
    $.post("../app/router/Router.php", 
        {'router':[{'controller': 'StudentsController', 'action': 'getStudentsTree'}]}, 
        function(data) {
            var arr = JSON.parse(data);

            //Вывод StudentsTree
            getStudentsTree(arr);

            // Работа с сайдбаром
            clickOnSidebar('.sidebar li > p');

            //Кнопки
            $('<button>', {
                text: 'Добавить студента',
                class: 'sidebar__add_student'
            }).appendTo($('.student').parent());
            

            //Create
            $(document).on('click', '.sidebar__add_student', function() {
                $(this).before('<li class="student"><input /></li>');
            });

            $(document).on('focusout', '.sidebar .student input', function() {
                var name = $(this).val();
                var id = $(this).parents('.group').attr('id');
            
                $(this).closest('li').text(name);
            
                var pst = {'form':[], 'router':[]};
                pst.form.push({
                    'name': name,
                    'id': id
                });
            
                pst.router.push({
                    'controller': 'StudentsController',
                    'action': 'createStudent'
                });

                console.table(pst);

                $.post("../app/router/Router.php", pst, function(data) {
                    // console.log(data);
                });
            });

            //Read
            $(document).on('click', '.student', function() {
                if (!($(this).text())) return;

                var id = $(this).attr('id');
                        
                var pst = {'student':[], 'router':[]};
                pst.student.push({
                    'id': id,
                });
            
                pst.router.push({
                    'controller': 'StudentsController',
                    'action': 'readStudent'
                });

                $.post("../app/router/Router.php", pst, function(data) {
                    var arr = JSON.parse(data);
                    console.table(arr);

                    arr.forEach(function(el) {
                        $('.table').append("<tr><td>" + el['subject'] + "</td><td>" + el['mark'] + "</td><td>" + el['professor'] + "</td></tr>");
                    })
                });
            });

            //Udpate
            //Необходимо продумать действие во фронтенде


            //Работа с таблицей
            $(".table__add_student").click(function() {
                $('.table').append("<tr><td></td><td></td><td></td></tr>");
            });

            $(document).on('click', '.table td', function(){
                if($(this).find("input").length == 0) {
                    var val = $(this).text();
                    $(this).html("<input value='" + val + "'/>");
                }
            });

            $(document).on('focusout', '.table td input', function() {
                var val = $(this).val();
                $(this).closest('td').text(val);
            });

            $(document).on('click', '.table__save_student', function(e) {
                var pst = {'marks_table':[]};

                $('.table tr').each(function (el) {
                    console.log(el);
                    var row = $(el).find('td');
                    console.log($(row[0]).text());
                    if(row.length > 0) {
                        pst.marks_table.push({
                            'subject': $(row[0]).text(),
                            'mark': $(row[1]).text(),
                            'professor': $(row[2]).text(),
                        });
                    }
                });

                console.log(pst);

                $.post(document.location.href, pst, function(data) {
                    console.log(data);
                    console.log('success');
                });
            });
                
            });

});