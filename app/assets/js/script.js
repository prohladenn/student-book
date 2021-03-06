function clickOnSidebar(el) {
    $(el).click(function() {
        $('.faculty').find('ul').css('display', 'none');

        $(this).closest('.group').children('ul').css('display', 'inline');
        $(this).closest('.course').children('ul').css('display', 'inline');
        $(this).closest('.faculty').children('ul').css('display', 'inline');
    });
};

function getStudentsTree(arr) {
    $('.sidebar').html('');
    var ul = $('<ul>').appendTo('.sidebar');
    ul.wrap('<div></div>');

    for (faculty in arr) {
        var faculty_name = $('<li>', {
            html: '<span class="form">' + '<span>' + faculty.split(',')[0] + '</span>' + '<i class="fas fa-pen"></i>' + '<i class="fas fa-trash-alt"></i>' + '</span>', 
            class: 'faculty', 
            id: faculty.split(',')[1]
        }).appendTo(ul);
        var faculty_ul = $('<ul>').appendTo(faculty_name);

        for (course in arr[faculty]) {
            var course_name = $('<li>', {
                html: '<span class="form">' + '<span>' + course.split(',')[0] + '</span>' + '<i class="fas fa-pen"></i>' + '<i class="fas fa-trash-alt"></i>' + '</span>', 
                class: 'course', 
                id: course.split(',')[1]
            }).appendTo(faculty_ul);
            var course_ul = $('<ul>').appendTo(course_name);

            for (group in arr[faculty][course]) {
                var group_name = $('<li>', {
                    html: '<span class="form">' + '<span>' + group.split(',')[0] + '</span>' + '<i class="fas fa-pen"></i>' + '<i class="fas fa-trash-alt"></i>' + '</span>', 
                    class: 'group', 
                    id: group.split(',')[1]
                }).appendTo(course_ul);
                var group_ul = $('<ul>').appendTo(group_name);

                for (student in arr[faculty][course][group]) {
                    $('<li>', {
                        html: '<span class="form">' + '<span>' + arr[faculty][course][group][student].split(',')[0] + '</span>' + '<i class="fas fa-pen"></i>' + '<i class="fas fa-trash-alt"></i>' + '</span>', 
                        class: 'student', 
                        id: arr[faculty][course][group][student].split(',')[1]
                    }).appendTo(group_ul);
                }
            }
        }
    }
    $('<button>', {
        text: '+',
        class: 'sidebar__add_form'
    }).appendTo($('.faculty').parent());
};

function getButtons() {
    $(document).on('click', '.sidebar', function(e) {

        switch ($(e.target).parent().parent().attr('class')) {
            case 'group':
                $('.sidebar').find('button').remove();

                if ($(e.target).closest('.group').children('ul').css('display') == 'none') {
                    $('<button>', {
                        text: '+',
                        class: 'sidebar__add_form'
                    }).appendTo($(e.target).closest('.course'));
                    return;
                };

                $('<button>', {
                    text: '+',
                    class: 'sidebar__add_form'
                }).appendTo($(e.target).closest('.group'));
                break;

            case 'course':
                $('.sidebar').find('button').remove();

                if ($(e.target).closest('.course').children('ul').css('display') == 'none') {
                    $('<button>', {
                        text: '+',
                        class: 'sidebar__add_form'
                    }).appendTo($(e.target).closest('.faculty'));
                    return;
                };

                $('<button>', {
                    text: '+',
                    class: 'sidebar__add_form'
                }).appendTo($(e.target).closest('.course'));
                break;

            case 'faculty':
                $('.sidebar').find('button').remove();

                if ($(e.target).closest('.faculty').children('ul').css('display') == 'none') {
                    return;
                };

                $('<button>', {
                    text: '+',
                    class: 'sidebar__add_form'
                }).appendTo($(e.target).closest('.faculty'));
                break;
        }

        setTimeout(function() {
            if ($('.sidebar').find('button').length == 0) {
                $('<button>', {
                    text: '+',
                    class: 'sidebar__add_form'
                }).appendTo($('.faculty').parent());
            } else {
                $('.faculty').siblings('button').remove();
            }
        }, 320);
    });
};

$(function() {
    $.post("../app/router/Router.php", 
        {'router':[{'controller': 'StudentsTreeController', 'action': 'getStudentsTree'}]}, 
        function(data) {
            var arr = JSON.parse(data);

            getStudentsTree(arr);
            clickOnSidebar('.sidebar li > span');
            getButtons();
        }
    );

    //Create form
    $(document).on('click', '.sidebar__add_form', function() {
        var formType = $(this).siblings('ul').children(':first').attr('class');
        $(this).before("<li class="+ formType +"><input /></li>");

        $(document).on('focusout', '.sidebar input', function() {
            var formName = $(this).val();
            var formParentId = $(this).parent().parent().attr('id');
        
            $(this).closest('li').text(formName);
        
            var pst = {'form':[], 'router':[]};
            pst.form.push({
                'name': formName,
                'id': formParentId,
                'form_type': formType
            });
        
            pst.router.push({
                'controller': 'FormController',
                'action': 'createForm'
            });

            console.log(pst);

            $.post("../app/router/Router.php", pst, function(data) {

            });
        });
    });

    //Udpate form
    $(document).on('click', '.fa-pen', function() {
        var text = $(this).siblings('span').text();
        var id = $(this).parent().parent().attr('id');
        var formType = $(this).parent().parent().attr('class');
        $(this).parent().html('<li class='+ formType +' id=' + id +'><input value=' + text + ' /></li>');

        $(document).on('focusout', '.sidebar input', function() {
            var name = $(this).val();
            var id = $(this).parent().attr('id');
        
            $(this).closest('li').text(name);
        
            var pst = {'form':[], 'router':[]};
            pst.form.push({
                'name': name,
                'id': id,
                'form_type': formType
            });
        
            pst.router.push({
                'controller': 'FormController',
                'action': 'updateForm'
            });

            $.post("../app/router/Router.php", pst, function(data) {

            });
        });
    });

    //Delete form
    $(document).on('click', '.fa-trash-alt', function() {
        var id = $(this).parent().parent().attr('id');
        var formType = $(this).parent().parent().attr('class');

        $(this).parent().remove();

        var pst = {'form':[], 'router':[]};
        pst.form.push({
            'id': id,
            'form_type': formType
        });
    
        pst.router.push({
            'controller': 'FormController',
            'action': 'deleteForm'
        });

        $.post("../app/router/Router.php", pst, function(data) {

        });
    });

    //Get mark table
    $(document).on('click', '.student > span', function() {
        if ($('.table__new_row').length) {
            if (confirm('Удалить все изменения?')) {
                $('.table tr ~ tr').remove();
            } else {
                return;
            }
        }

        if ($('.table__update_row').length) {
            if (confirm('Выйти без сохранения?')) {
                $('.table tr ~ tr').remove();
            } else {
                return;
            }
        }

        $('.student_name').remove();
        $('.table').before("<span class='student_name'>"+ $(this).text() +"</span>");

        $('.table tr ~ tr').remove();

        var id = $(this).parent().attr('id');
        $('.table').attr('id', id);
                
        var pst = {'student':[], 'router':[]};
        pst.student.push({
            'id': id,
        });
    
        pst.router.push({
            'controller': 'MarkTableController',
            'action': 'getMarkTable'
        });

        $.post("../app/router/Router.php", pst, function(data) {
            var arr = JSON.parse(data);

            arr.forEach(function(el) {
                $('.table').append("<tr class='table__old_row' id=" + el['id'] +"><td>" + el['subject'] + "</td><td>" + el['mark'] + "</td><td>" + el['professor'] + "</td></tr>");
            })
        });
    });

    //Set && Update mark table
    $(document).on('click', '.table__add_student', function() {
        if (!$('.table').attr('id')) {
            alert('Выберите студента');
            return;
        }
        $('.table').append("<tr class='table__new_row'><td></td><td></td><td></td></tr>");
    });

    $(document).on('click', 'tr.table__new_row td', function(){
        if($(this).find("input").length == 0) {
            var val = $(this).text();
            $(this).html("<input value='" + val + "'/>");
        }
    });
    $(document).on('click', 'tr.table__old_row td', function(){
        if($(this).find("input").length == 0) {
            var val = $(this).text();
            $(this).html("<input value='" + val + "'/>");
            $(this).parent().attr('class', 'table__update_row');
        }
    });

    $(document).on('focusout', '.table tr td input', function() {
        var val = $(this).val();
        $(this).closest('td').text(val);
    });

    $(document).on('click', '.table__save_student', function() {
        if (!$('.table__new_row').length && !$('.table__update_row').length) {
            alert('Изменения не найдены');
            return;
        };

        if ($('.table__new_row').length) {
            var pstSet = {'mark_table':[], 'student':[], 'router':[]};

            pstSet.student.push({
                'id': $('.table').attr('id')
            });

            $('.table__new_row').each(function() {
                var row = $(this).find('td');
                if(row.length > 0) {
                    pstSet.mark_table.push({
                        'subject': $(row[0]).text(),
                        'mark': $(row[1]).text(),
                        'professor': $(row[2]).text()
                    });
                }
            });

            pstSet.router.push({
                'controller': 'MarkTableController',
                'action': 'setMarkTable'
            });

            $.post("../app/router/Router.php", pstSet, function(data) {

            });
        } 
        if ($('.table__update_row').length) {
            var pstUpdate = {'mark_table':[], 'router':[]};

            $('.table__update_row').each(function() {
                var row = $(this).find('td');
                var id = $(this).attr('id');
                if(row.length > 0) {
                    pstUpdate.mark_table.push({
                        'id': id,
                        'subject': $(row[0]).text(),
                        'mark': $(row[1]).text(),
                        'professor': $(row[2]).text()
                    });
                }
            });

            pstUpdate.router.push({
                'controller': 'MarkTableController',
                'action': 'updateMarkTable'
            });

            $.post("../app/router/Router.php", pstUpdate, function(data) {

            });
        }
    });
});