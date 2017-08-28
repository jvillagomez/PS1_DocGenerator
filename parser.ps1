clear
$FilePath = "C:\Users\jvillagomez\OneDrive - ucx.ucr.edu\source\PowerShell\Admin\modules\DIT_Helpers.psm1"


Function Get-Functions
{
  Param
  (
    [Parameter(Mandatory=$true)]
    [String]
    $filePath
  )
  Process
  {
        $moduleString = Get-Content $filePath -Raw
        #write-host $moduleString
        $NumberOfFuncs = (($moduleString -Split "<#!").count)-1
        #write-host $NumberOfFuncs
        if(!$NumberOfFuncs)
        {
            write-host $NumberOfFuncs
            write-host "No functions to document. Check your files." -ForegroundColor Yellow
            return $false
        }

        $ParsedDocs = ParseComments $moduleString
        return $ParsedDocs
  }
}

Function ParseComments
{
    Param
    (
        [Parameter(Mandatory=$true)]
        [String]
        $fileContent
    )
    Process
    {
        $NumberOfFuncs = (($fileContent -Split "<#!").count)-1
        $functions = @()
        for ($i=0; $i -lt $NumberOfFuncs; $i++)
        {
            $splitFileContent = ((($fileContent -split "<#!",2)[1] | ? {$_}) -split "!#>",2)
            $FunctionDocumentation = ((($fileContent -split "<#!",2)[1] | ? {$_}) -split "!#>",2)[0]
            $functions += $FunctionDocumentation

            $fileContent = ((($fileContent -split "<#!",2)[1] | ? {$_}) -split "!#>",2)[1]
            #write-host "================================================="
            #write-host $FunctionDocumentation
        }
        #Write-Host $functions

        $DocumentationObjects = @()
        foreach($func in $functions)
        {
            $FunctionSynopsis = ((($func -split ".SYNOPSIS",2)[1] | ? {$_}) -split '\n.NAME',2)[0].Trim()
            #write-host $FunctionSynopsis
            $FunctionName = ((($func -split "\n.NAME",2)[1] | ? {$_}) -split '\n.GROUP',2)[0].Trim()
            #write-host $FunctionName
            $FunctionGroup = ((($func -split "\n.GROUP",2)[1] | ? {$_}) -split '\n.DESCRIPTION',2)[0].Trim()
            #write-host $FunctionGroup
            $FunctionDescription = ((($func -split "\n.DESCRIPTION",2)[1] | ? {$_}) -split '\n.PARAMETER Name',2)[0].Trim()
            #write-host $FunctionDescription
            $FunctionParamName = ((($func -split "\n.PARAMETER Name",2)[1] | ? {$_}) -split '\n.OUTPUTS',2)[0].Trim()
            #write-host $FunctionParamName
            $FunctionOutput = ((($func -split "\n.OUTPUTS",2)[1] | ? {$_}) -split '\n.EXAMPLE',2)[0].Trim()
            #write-host $FunctionOutput
            $FunctionExample = ($func -split "\n.EXAMPLE",2)[1].Trim()
            #write-host $FunctionExample

            $object = New-Object -TypeName PSObject
            $object | Add-Member –MemberType NoteProperty –Name title –Value $FunctionSynopsis
            $object | Add-Member –MemberType NoteProperty –Name name –Value $FunctionName
            $object | Add-Member –MemberType NoteProperty –Name group –Value $FunctionGroup
            $object | Add-Member –MemberType NoteProperty –Name groupTitle –Value $FunctionGroup
            $object | Add-Member –MemberType NoteProperty –Name description –Value $FunctionDescription
            $object | Add-Member –MemberType NoteProperty –Name paramName –Value $FunctionParamName
            $object | Add-Member –MemberType NoteProperty –Name output –Value $FunctionOutput
            $object | Add-Member –MemberType NoteProperty –Name example –Value $FunctionExample
            $object | Add-Member –MemberType NoteProperty –Name version –Value "0.0.0"

            $DocumentationObjects += $object

            #$SynopisRegex = ".SYNOPSIS(.*).NAME"
            #$result = [regex]::match($func, $SynopsisRegex).Groups[1].Value
            #$result
        }
        #Write-Host $DocumentationObjects
        return $DocumentationObjects
    }
}

Function WriteToJsFile
{
    PARAM
    (
        [Parameter(Mandatory=$true)]
        [System.Object[]] $JsonObjects #Array of JSON strings
    )
    Process
    {
        $fileStart = 'define({ "api": ['
        $fileEnd = '] });'
        $JsonStrings = @()
        Foreach ($json in $JsonObjects)
        {
            $JsonString = $json | ConvertTo-Json
            #write-host $JsonString
            #write-host $Json
            $JsonStrings += $JsonString
        }
        $fileBody = $JsonStrings -Join ","
        $fileContent = $fileStart+$fileBody+$fileEnd
        $filePath = Join-Path $PSScriptRoot "docs\api_data.js"
        write-host $filePath
        $fileContent | Out-File -FilePath $filePath
    }
}

Function WriteIndexHeaders
{
    Param
    (
    )
    Process
    {
        #PA
        $Source = Join-Path $PSScriptRoot "apidoc.json"
        $SourceContent = Get-Content $Source -Raw
        $SourceObject = $SourceContent | ConvertFrom-Json
        $DocsName = $SourceObject.name
        $DocsDescription = $SourceObject.description
        $DocsTitle = $SourceObject.title

        $SourceObject = New-Object -TypeName PSObject
        $SourceObject | Add-Member –MemberType NoteProperty –Name name –Value $DocsName
        $SourceObject | Add-Member –MemberType NoteProperty –Name description –Value $DocsDescription
        $SourceObject | Add-Member –MemberType NoteProperty –Name title –Value $DocsTitle

        $SourceString = $SourceObject | ConvertTo-Json
        $SourceString = ($SourceString -replace "{","") -replace "}",""

        $fileStart = 'define({'
        $fileBody = $SourceString+','
        $fileEnd = 
        '"version": "1.0.0",
          "template": {
            "forceLanguage": "en"
          },
          "sampleUrl": false,
          "defaultVersion": "0.0.0",
          "apidoc": "0.3.0",
          "generator": {
            "name": "apidoc",
            "time": "2017-07-27T18:07:34.761Z",
            "url": "http://apidocjs.com",
            "version": "0.17.6"
          }
        });'

        $fileContent = $fileStart + $fileBody + $fileEnd
        #Write-Host $fileContent
        $OutputPath = Join-Path $PSScriptRoot 'docs\api_project.js'
        $fileContent | Out-File $OutputPath
    }
}

Function GenerateDocumentation
{
    PARAM
    (
        [Parameter(Mandatory=$true)]
        [String] $InputFile
    )
    Process
    {
        #Check dir files for any comments in the correct format. Formatted comments will be parsed accrodingly.
        $ModuleFunctions = Get-Functions $InputFile #if there are no comments/fucntions, quit the program
        #write-host $ModuleFunctions
        #Convert the ps1 objects to json strings and write to the javascript file that feeds the index file
        WriteToJsFile $ModuleFunctions
        WriteIndexHeaders
    }
}


GenerateDocumentation $FilePath
