---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: Мастера
seoDescription: Структура и API мастера в 1С-Битрикс. Кастомизация и пример реализации.
seoKeywords: битрикс, wizards
date: 2018-01-05 08:00:00
---
# Мастера

## Структура

Все мастера находятся в папке `/bitrix/wizards/`. Системные мастера находятся в директории `/bitrix/wizards/bitrix/`. Содержимое этой папки обновляется системой `SiteUpdate` и не может изменяться пользователем. Пользовательские мастера могут находиться в любых других подпапках директории `/bitrix/wizards/` или прямо в директории `/bitrix/wizards/`.

Файлы, к которым нельзя обращаться напрямую, должны содержать в начале следующий код:

```php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}
```

Файловая структура:

+ `wizard.php` - определяются все шаги мастера. Этот файл должен всегда присутствовать в папке мастера;
+ `.description.php` - название, описание, а также ряд других характеристик мастера. Обязательный.
+ Директория lang - языковые сообщения (перевод) мастера. В ней находятся директории с именами, равными кодам языков.
+ другие папки и файлы с ресурсами - вспомогательные ресурсы мастера.

## .description.php

```php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}
$arWizardDescription = Array(
    "NAME" => GetMessage("WD_TITLE"),
    "DESCRIPTION" => GetMessage("WD_TITLE_DESCR"),
    "ICON" => "images/icon.gif",
    "VERSION" => "1.0.0",
    "DEPENDENCIES" => Array(
        "main" => "6.5.0",
        "sale" => "6.0.0",
        "currency" => "6.0.0"
    ),
    "STEPS" => Array(
        "Step0",
        "Step1",
        "Step2",
        "Step3",
        "Step4",
        "Step5",
        "Install",
        "FinalStep",
        "CancelStep"
    ),
    "TEMPLATES" => Array(
        Array(
            "SCRIPT" => "wizard_template.php",
            "CLASS" => "DemoSiteTemplate"
        )
    )
);
```

### Описание .description.php

В файле определяется массив `$arWizardDescription`, который описывает мастер. Этот массив может иметь следующие ключи:

Ключ | Значение
--- | ---
"NAME" | название мастера;
"DESCRIPTION" | описание мастера;
"ICON" | иконка мастера, путь к файлу относительно папки мастера;
"VERSION" | версия мастера;
"DEPENDENCIES" | зависимости мастера от модулей. Значением этого ключа должен быть массив вида Array("ID модуля"=>"версия модуля" [, ...]);
"STEPS" | массив названий классов, определяющих шаги в файле wizard.php;
"TEMPLATES" | шаблоны мастера. Значением этого ключа должен быть массив, элементами которого должен быть массив, имеющий следующие ключи: `"CLASS"` - имя класса, описывающего шаблон; `"SCRIPT"` - путь к файлу, в котором определён класс шаблона относительно папки мастера; `"STEP"` - ID шага, для которого определяется шаблон. Если ключ `"STEP"` не указан, шаблон будет определён для всех шагов мастера; 

По умолчанию первый элемент в массиве названий классов является первым шагом мастера. Именно этот шаг появляется при запуске мастера. Изменить первый шаг мастера можно динамически с помощью метода `CWizardBase::SetFirstStep`.

## wizard.php

В файле `wizard.php` определяются все шаги и их содержимое. Каждый шаг определяется классом, который обязательно должен наследоваться от класса `CWizardStep`. В классе шага необходимо переопределить 3 метода:

+ `InitStep` – вызывается при добавлении шага в мастер. Метод предназначен для инициализации свойств шага: идентификатора (ID), заголовка, подзаголовка, кнопок перехода на следующие шаги и др. В этом методе обязательно нужно определить ID шага;
+ `ShowStep` – вызывается в момент показа шага пользователю. Метод предназначен для определения содержимого шага: в переменную `$this->content` необходимо записать весь вывод шага;
+ `OnPostForm` – вызывается при нажатии на любую из кнопок навигации мастера. В этом методе можно проверить входные данные, вернуть ошибки, изменить текущий шаг, выполнить любые другие действия;

Методы `ShowStep` и `OnPostForm` переопределять необязательно. Метод `InitStep` обязательно должен присутствовать в классе, т.к. в нем с помощью функции `SetStepID` определяется ID шага. В случае динамического определения шагов устанавливать ID шага в `InitStep` необязательно.

Класс `СWizardBase` является оболочкой мастера и содержит методы общие для всех шагов (работа с переменными мастера, управление кнопками навигации и др.). Для получения доступа к методам класса `СWizardBase` в теле переопределяемых функций (`InitStep`, `ShowStep`, `OnPostFrom`) нужно получить объект мастера с помощью метода `CWizardStep::GetWizard`:

```php
$wizard = &$this->GetWizard(); //Получаем ссылку на объект мастера
$myVar = $wizard->GetVar("myVar"); //Используем метод мастера (класс CWizardBase)
```

Для каждого шага, добавляемого в мастер, создаётся экземпляр класса `CWizardStep`. В переопределяемых функциях шага методы класса `CWizardStep` доступны через переменную-псевдоним `$this`. Каждый шаг мастера сам определяет, какие кнопки навигации (Назад, Далее, Готово, Отмена) будут показаны, и на какой шаг они будут вести. Названия кнопок можно изменить по своему усмотрению. 

Как правило, содержимое шага представляет собой набор полей Web-формы. Для упрощения работы с элементами Web-формы класс `CWizardStep` содержит методы для создания текстовых полей, переключателей, флажков и др.

## Документация

[кастомизация шаблона мастера](https://dev.1c-bitrix.ru/api_help/main/general/wizards/6.templates.php)
[запуск мастера](https://dev.1c-bitrix.ru/api_help/main/general/wizards/7.wizard_start.php)
[мастер создания сайта](https://dev.1c-bitrix.ru/api_help/main/general/wizards/site/index.php)
[примеры](https://dev.1c-bitrix.ru/api_help/main/general/wizards/samples/index.php)
[классы](https://dev.1c-bitrix.ru/api_help/main/general/wizards/api/index.php)

## Пример реализации из курса

`version.php`:

```php
<?
$arWizardVersion = array(
    "VERSION" => "1.0.0"
);
```

`.desciption.php`:

```php
<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
//version
include(dirname(__FILE__) . '/version.php');
$arWizardDescription = array(
    "NAME" => GetMessage("MASTER_NAME"),
    "DESCRIPTION" => GetMessage("MASTER_DESCRIPTION"),
    "VERSION" => $arWizardVersion['VERSION'],
    "STEPS" => array(
        "MainFields",
        "AdditionalFields",
        "Summary"
    )
);
```

`wizard.php`:

```php
<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
class MainFields extends CWizardStep
{
    // Инициализация
    function InitStep()
    {
        // ID шага
        $this->SetStepID("main_fields");
        // Заголовок
        $this->SetTitle(GetMessage("MF_INIT_TITLE"));
        $this->SetSubTitle(GetMessage("MF_INIT_SUBTITLE"));
        // Навигация
        $this->SetNextStep("additional_fields");
    }
    // Вывод полей
    function ShowStep()
    {
        if (!CModule::IncludeModule('iblock'))
            return;
        $wizard =& $this->GetWizard();
        $arIBlocks = array(
            0 => ""
        );
        $rsIBlock = CIBlock::GetList(array(
            'id' => 'asc'
        ), array(
            'ACTIVE' => "Y"
        ), false);
        while ($arIBlock = $rsIBlock->Fetch()) {
            $arIBlocks[$arIBlock['ID']] = "[" . $arIBlock['ID'] . "] " . $arIBlock['NAME'];
        }
        $this->content .= "<table class='wizard-data-table'>";
        // IBLOCK_ID
        $this->content .= "<tr><th align = 'right'><span class='wizard-required'>*</span>" . GetMessage('MF_SS_CHOOSE_IBLOCK_ID') . "</th><td>";
        $this->content .= ParseRssWizardTools::ShowSelectField("IBLOCK_ID", $arIBlocks) . "</td></tr>";
        // RSS URL
        $this->content .= "<tr><th align='right'><span class='wizard-required'>*</span>" . GetMessage('MF_SS_RSS_PATH') . "</th><td>" . $this->ShowInputField("text", "RSS_URL", Array(
            "size" => 25
        )) . "</td></tr>";
        $this->content .= "</table>";
        $this->content .= "<br/><div class='wizard-note-box'><span class='wizard-required'>*</span>" . GetMessage('MF_SS_REQ_FIELDS') . "</div>";
        // JS
        $formName   = $wizard->GetFormName();
        $nextButton = $wizard->GetNextButtonID();
        $iblockId = $wizard->GetRealName("IBLOCK_ID");
        $rssUrl   = $wizard->GetRealName("RSS_URL");
        $noIblockId = GetMessage('MF_SS_NO_IBLOCK_ID');
        $noRssPath  = GetMessage('MF_SS_NO_RSS_PATH');
        $this->content .= <<<JS
           <script type="text/javascript">
                function CheckMainFields()
                {
                    var form = document.forms["{$formName}"];
                    if (!form)
                        return;
                    var iblockId = form.elements["{$iblockId}"].value;
                    var rssUrl = form.elements["{$rssUrl}"].value;
                    var error = "";
                    if (iblockId == 0)
                        error += "{$noIblockId}\\n";
                    if (rssUrl.length < 6)
                        error += "{$noRssPath}\\n";
                    if (error.length > 0)
                    {
                        alert(error);
                        return false;
                    }
                }
                function AttachEvent()
                {
                    var form = document.forms["{$formName}"];
                    if (!form)
                        return;
                    var nextButton = form.elements["{$nextButton}"];
                    if (!nextButton)
                        return;
                    nextButton.onclick = CheckMainFields;
                }
                if (window.addEventListener)
                    window.addEventListener("load", AttachEvent, false);
                else if (window.attachEvent)
                    window.attachEvent("onload", AttachEvent);
                //setTimeout(AttachEvent, 500);
            </script>
JS;
    }
    // Обработчик полей формы
    function OnPostForm()
    {
        $wizard =& $this->GetWizard();
        if ($wizard->IsCancelButtonClick())
            return;
        $iblockId = $wizard->GetVar("IBLOCK_ID");
        if ($iblockId === 0)
            $this->SetError(GetMessage('MF_OPF_NO_IBLOCK_ID'), "IBLOCK_ID");
        $rssUrl = $wizard->GetVar("RSS_URL");
        if (strlen($rssUrl) < 6)
            $this->SetError(GetMessage('MF_OPF_NO_RSS_PATH'), "RSS_URL");
        elseif (!file_get_contents($rssUrl))
            $this->SetError(GetMessage('MF_OPF_WRONG_RSS'), "RSS_URL");
    }
}
class AdditionalFields extends CWizardStep
{
    // Инициализация
    function InitStep()
    {
        // ID шага
        $this->SetStepID("additional_fields");
        // Заголовок
        $this->SetTitle(GetMessage("AF_INIT_TITLE"));
        $this->SetSubTitle(GetMessage("AF_INIT_SUBTITLE"));
        // Навигация
        $this->SetPrevStep("main_fields");
        $this->SetFinishStep("summary");
        $this->SetFinishCaption(GetMessage("AF_INIT_FINISH_CAPTION"));
    }
    function ShowStep()
    {
        if (!CModule::IncludeModule('iblock'))
            return;
        $wizard =& $this->GetWizard();
        // Парсим RSS
        $rssData = ParseRssWizardTools::ParseRss($wizard->GetVar("RSS_URL"));
        if ($rssData['count'] > 0) {
            $arPropertiesEx = ParseRssWizardTools::GetIblockFields();
            // Свойства выбранного инфоблока
            $rsProperties = CIBlockProperty::GetList(array(
                "sort" => "asc",
                "name" => "asc"
            ), array(
                "ACTIVE" => "Y",
                "IBLOCK_ID" => $wizard->GetVar("IBLOCK_ID")
            ));
            while ($arProperties = $rsProperties->GetNext()) {
                $arPropertiesEx['PROPERTY_' . $arProperties['ID']] = "[PROPERTY_" . $arProperties['ID'] . "] " . GetMessage("AF_SS_PROPERTY") . " " . $arProperties['NAME'];
            }
            $arRssFields = ParseRssWizardTools::GetRssFields();
            $this->content .= "<table class='wizard-data-table'>";
            $this->content .= "<thead><tr><th><b>" . GetMessage("AF_SS_EXAMPLE") . "</b></th><th><b>" . GetMessage("AF_SS_RSS_FIELDS") . "</b></th><th><b>" . GetMessage("AF_SS_IBLOCK_FIELDS") . "</b></th></tr></thead>";
            foreach ($arRssFields as $rssField) {
                $this->content .= "<tr><th align='right'><div style='max-height:44px;overflow:hidden;width:180px;'>" . html_entity_decode($rssData[$rssField][0]) . "</div></th>";
                $this->content .= "<th align='right'>" . $rssField . "</th>";
                $this->content .= "<td>" . ParseRssWizardTools::ShowSelectField("RSS_" . strtoupper($rssField), $arPropertiesEx) . "</td></tr>";
            }
            $this->content .= "</table>";
        }
    }
    function OnPostForm()
    {
        $wizard =& $this->GetWizard();
        if ($wizard->IsCancelButtonClick())
            return;
        if (!CModule::IncludeModule("iblock"))
            return;
        global $USER;
        // Парсим rss
        $rssData = ParseRssWizardTools::ParseRss($wizard->GetVar("RSS_URL"));
        if ($rssData['count'] > 0) {
            $arRssFields    = ParseRssWizardTools::GetRssFields();
            $arIblockFields = ParseRssWizardTools::GetIblockFields();
            // Создаем элементы
            $elementsCnt = 0;
            for ($i = 0; $i < $rssData['count']; $i++) {
                $obElement = new CIBlockElement;
                $arLoadRssArray = Array(
                    "MODIFIED_BY" => $USER->GetID(),
                    "IBLOCK_SECTION_ID" => false,
                    "IBLOCK_ID" => $wizard->GetVar("IBLOCK_ID"),
                    "ACTIVE" => "Y"
                );
                // Заполняем массив полей нового элемента
                foreach ($arRssFields as $rssField) {
                    $paramCode = $wizard->GetVar("RSS_" . strtoupper($rssField));
                    // Стандартные поля
                    if (array_key_exists($paramCode, $arIblockFields)) {
                        $value = $rssData[$rssField][$i];
                        $arLoadRssArray[$paramCode] = $value;
                    } else {
                        $arParamCode = explode('_', $paramCode);
                        // Дополнительные свойства
                        if ($arParamCode[0] == "PROPERTY" && intval($arParamCode[1]) > 0) {
                            $arLoadRssArray['PROPERTY_VALUES'][$arParamCode[1]] = $rssData[$rssField][$i];
                        }
                    }
                }
                // Если не указан параметр NAME
                if (!$arLoadRssArray['NAME'])
                    $arLoadRssArray['NAME'] = ($rssData['title'][$i]) ? $rssData['title'][$i] : GetMessage("AF_OPF_ELEMENT");
                if ($elementId = $obElement->Add($arLoadRssArray)) {
                    $elementsCnt++;
                } else
                    $this->SetError(GetMessage("AF_OPF_ADD_ERROR") . $obElement->LAST_ERROR);
            }
            $wizard->SetVar("ELEMENT_CNT", $elementsCnt);
        }
    }
}
class Summary extends CWizardStep
{
    // Инициализация
    function InitStep()
    {
        // ID шага
        $this->SetStepID("summary");
        // Заголовок
        $this->SetTitle(GetMessage("S_INIT_TITLE"));
        $this->SetSubTitle(GetMessage("S_INIT_SUBTITLE"));
        // Навигация
        $this->SetCancelStep("summary");
        $this->SetCancelCaption(GetMessage("S_INIT_CANCEL_CAPTION"));
    }
    function ShowStep()
    {
        $wizard =& $this->GetWizard();
        $this->content .= GetMessage("S_SS_ELEMENTS") . "<b>" . $wizard->GetVar("ELEMENT_CNT") . "</b><br/>";
    }
}
// Вспомогательные методы
class ParseRssWizardTools
{
    var $rssFields;
    // Возвращает сформированный select
    public function ShowSelectField($name, $arValues = array(), $arAttributes = array())
    {
        $wizard = $this->GetWizard();
        $this->SetDisplayVars(Array(
            $name
        ));
        $varValue       = $wizard->GetVar($name);
        $selectedValues = ($varValue !== null && $varValue != "" ? $varValue : ($varValue === "" ? Array() : $wizard->GetDefaultVar($name)));
        if (!is_array($selectedValues))
            $selectedValues = Array(
                $selectedValues
            );
        $prefixName = $wizard->GetRealName($name);
        $strReturn .= '<select name="' . htmlspecialcharsbx($prefixName) . '"' . $this->_ShowAttributes($arAttributes) . '>';
        foreach ($arValues as $optionValue => $optionName)
            $strReturn .= '<option value="' . htmlspecialcharsEx($optionValue) . '"' . (in_array($optionValue, $selectedValues) ? " selected=\"selected\"" : "") . '>' . htmlspecialcharsEx($optionName) . '</option>
            ';
        $strReturn .= '</select>';
        return $strReturn;
    }
    // Метод получения полей элемента инфоблока
    public function GetIblockFields()
    {
        return array(
            0 => "",
            "XML_ID" => "[XML_ID] Уникальный идентификатор",
            "NAME" => "[NAME] Название",
            "PREVIEW_TEXT" => "[PREVIEW_TEXT] Описание для анонса",
            "DETAIL_TEXT" => "[DETAIL_TEXT] Детальное описание",
            "ACTIVE_FROM" => "[ACTIVE_FROM] Активность с",
            "CODE" => "[CODE] Мнемонический код",
            "TAGS" => "[TAGS] Теги"
        );
    }
    // Метод получения полей RSS
    public function GetRssFields()
    {
        return $this->rssFields;
    }
    // Метод импорта RSS
    public function ParseRss($rssUrl)
    {
        if ($rssData = simplexml_load_file($rssUrl)) {
            if (count($rssData->channel->item) > 0) {
                foreach ($rssData->channel->item[0] as $code => $value) {
                    $arRssFields[] = $code;
                }
                $this->rssFields = $arRssFields;
                $arReturn = array(
                    'count' => count($rssData->channel->item)
                );
                foreach ($rssData->channel->item as $ID => $arItem) {
                    foreach ($arRssFields as $ID => $rssField) {
                        $arReturn[$rssField][] = (string) $arItem->{$rssField};
                    }
                }
                return $arReturn;
            }
        }
    }
}
?>
```