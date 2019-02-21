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

    //Сайдбар
    $.post();
    clickOnSidebar('.sidebar ul > a');

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

    // Работа с сайдбаром
    $(document).on('click', '.sidebar__add_student', function() {
        $(this).parent().before('<li><a href="#" class="student"><input /></a></li>');
    });
    $(document).on('focusout', '.sidebar .student input', function() {
        var student_name = $(this).val();
        var group_name = $(this).parents('.group_ul').children(':first').text();

        $(this).closest('a').text(student_name);

        var pst = {'student':[], 'router': []};
        pst.student.push({
            'student_name': student_name,
            'group_name': group_name
        });
        pst.router.push({
            'controller': 'MainController',
            'action': 'run'
        });
        console.table(pst);

        $.post("../app/router/Router.php", pst, function(data) {
            console.log(data);
        });
    });
});