<?php

namespace App\Controllers;

require_once __DIR__ . "/../models/FormModel.php";

class FormController {
    private $form_type;

    public function createForm() {
        $this->form_type = $_POST['form'][0]['form_type'];

        $form = new \App\Models\FormModel;
        $form->create($this->form_type);
    }

    public function updateForm() {
        $this->form_type = $_POST['form'][0]['form_type'];

        $form = new \App\Models\FormModel;
        $form->update($this->form_type);
    }

    public function deleteForm() {
        $this->form_type = $_POST['form'][0]['form_type'];

        $form = new \App\Models\FormModel;
        $form->delete($this->form_type);
    }
}