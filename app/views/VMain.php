<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <title>The table</title>

    <link rel="stylesheet" href="./assets/css/style.css">
</head>
<body>
   <header>
       <span>Университет ИТМО</span>
   </header>

   <div class="main_block">
        <div class="sidebar">
            <div>
                <ul>
                    <?php $tree = new App\Models\StudentsTreeModel; ?>
                    <!-- <a href="#" class="faculty">Факультет 1</a>
                    <li>
                        <ul>
                            <a href="#" class="course">Курс I</a>
                            <li>
                                <ul class="group_ul">
                                    <a href="#" class="group">ЭМ-43</a>
                                    <li>
                                        <ul>
                                            <li><a href="#" class="student">Вася Пупкин</a></li>
                                            <li><a href="#" class="sidebar__add_student">+</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="table_container">
            <table class="table">
                <tr>
                    <th>Дисциплина</th>
                    <th>Оценка</th>
                    <th>Преподаватель</th>
                </tr>
                <tr>
                    <td>ТОЭ</td>
                    <td>5</td>
                    <td>Аксютин</td>
                </tr>
            </table>
            <div>
                <button class="table__add_student">Добавить студента</button>
                <button class="table__save_student">Сохранить информацию</button>
            </div>
        </div>
   </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="./assets/js/script.js"></script>
</body>
</html>


<!-- TODO: Разбить весь файл на составные части для более удобной работы с ними -->