function clickOnSidebar(el) {
    $(el).click(function() {
        var next = $(this).next();
        next.css('display') == 'none' ? next.css('display', 'inline') : next.css('display', 'none');
    });
};

//TODO: Сделать на основе ООП класс Input, который бы добавлял в определенный элемент <input />

// function Input(el) {
    
// }

$(function() {
        // Работа с сайдбаром
        clickOnSidebar('.sidebar ul > p');

        $('<button>', {
            text: 'Добавить студента',
            class: 'sidebar__add_student'
        }).appendTo($('.student').parent());
    
        $(document).on('click', '.sidebar__add_student', function() {
            $(this).before('<li class="student"><input /></li>');
        });
        $(document).on('focusout', '.sidebar .student input', function() {
            var student_name = $(this).val();
            var group_name = $(this).parents().siblings('.group').first().text();
            var course_name = $(this).parents().siblings('.course').first().text();
            var faculty_name = $(this).parents().siblings('.faculty').first().text();
    
            $(this).closest('li').text(student_name);
    
            var pst = {'student':[], 'router': []};
            pst.student.push({
                'student_name': student_name,
                'group_name': group_name,
                'course_name': course_name,
                'faculty_name': faculty_name
            });
            pst.router.push({
                'controller': 'SidebarController',
                'action': 'addStudent'
            });
            console.table(pst);
    
            $.post("../app/router/Router.php", pst, function(data) {
                console.log(data);
            });
        });


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