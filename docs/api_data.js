define({ "api": [{
    "title":  "Creates User Objects form a text file containing names.",
    "name":  "Get-UsersFromList",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Opens up a file explorer window, allowing the user to select the txt file. Reads the file for UserPrincipalNames (emails), and returns the user object of each respective name. Must provide array of all available users objuects for matching to occur.",
    "paramName":  "[System.Objects] Mandatory; Array of all user objects available.",
    "output":  "Returns an array of User Objects.",
    "example":  "Connect-Msol\r\n$users = Get-Licensedusers\r\n$UsersList = Get-UsersFromList $users\r\n# UsersList contains all import users only!",
    "version":  "0.0.0"
},{
    "title":  "Quick function to check if ListA contains the entirety of ListB.",
    "name":  "listA-contains-listB",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Verifies if ListA contains all of the members in ListB. If a single member from ListB is not found in ListA, $false is returned.",
    "paramName":  "[System.Strings] $ListA: list used for reference.\r\n[System.Strings] $ListB: list that user wants to verify against ListA.",
    "output":  "Returns $true if the entirety of ListB can be found in ListA. Returns $false otherwise.",
    "example":  "$ListA = @(\"A\",\"B\",\"C\",\"D\")\r\n$ListB = @(\"A\",\"B\")\r\nA-contains-B $ListA $ListB #returns $true\r\n$ListA = @(\"A\",\"B\",\"C\",\"D\")\r\n$ListB = @(\"E\",\"F\")\r\nA-contains-B $ListA $ListB #returns $false\r\n$ListA = @(\"A\",\"B\",\"C\",\"D\")\r\n$ListB = @(\"A\",\"B\",\"E\")\r\nA-contains-B $ListA $ListB #returns $false",
    "version":  "0.0.0"
},{
    "title":  "Runs an external script with no pipeline.",
    "name":  "Invoke-Script",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Preferably used after Select-Option has been run. Will run a script from a given directory, identified by index.\r\nAfter the called script has finished running, will return to original script.",
    "paramName":  "[System.String ]$dir Path to directory containing external script.",
    "output":  "None. Runs chosen script, and returns to next line in original script.",
    "example":  "$dir = \"$PSScriptRoot\\Scripts\"\r\n$titles = Get-ScriptTitles $dir\r\n$prompt = \"Licensing Menu\"\r\n$choice = Select-Option $titles $prompt # Obtain index to call script contained inside of $dir\r\nInvoke-Script $dir $choice",
    "version":  "0.0.0"
},{
    "title":  "Grab titles from all scripts in a given directory",
    "name":  "Get-ScriptTitles",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Given a directory path, will copy all titles from .ps1 file headers. Use in providing a menu for Invoke-Script function (Calling other scripts).\r\nAll scripts in given directory MUST have a title, or error will be thrown. All scripts must contain a title to avoid any indexing errors",
    "paramName":  "[System.Sring] $dir: string containing the path containing ps1 scripts.",
    "output":  "Returns an array of strings (script titles).",
    "example":  "Connect-Msol\r\n$PathToScripts = \"C:\\PowerShell\\module\"\r\n$titles = Get-ScriptTitles\r\nWrite-Host $titles\r\n# Check STAFFHUB status (single)\r\n# Report STAFFHUB users (all)\r\n# Remove STAFFHUB user (single)\r\n# Remove STAFFHUB users (bulk)\r\n# Set STAFFHUB user (single)\r\n# Set STAFFHUB users (bulk)",
    "version":  "0.0.0"
},{
    "title":  "Checks if string ONLY contains numerical characters. Also accepts arrays.",
    "name":  "Is_Numeric",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Checks characters inside of the input string. If anything other than numerical characters are found, returns FALSE.\r\nFor arrays passed as arguments, function will perform a check on each element. If a single element contains non-numerical characters, it will return $false.",
    "paramName":  "[System.String] Input string to check for numerical characters.",
    "output":  "[System.Bool] Returns $true, if every character is numeric.",
    "example":  "is_Numeric \"1234\"    #Returns TRUE\r\nis_Numeric \" 123\"    #Returns TRUE\r\nis_Numeric \"12 4\"    #Returns FALSE\r\nis_Numeric \"ABDC\"    #Returns FALSE\r\nis_Numeric \"A2D3\"    #Returns FALSE\r\n$array = @(\"1\")             #true\r\nis_Numeric $array\r\n$array = @(\"1\", \"2\", \"3\")   #true\r\nis_Numeric $array\r\n$array = @(\"1\", \"2\", \" 3\")  #true\r\nis_Numeric $array\r\n$array = @(\"1\", \"2\", \" A\")  #false\r\nis_Numeric $array\r\n$array = @(\"1\", \"2\", \" \")   #false\r\nis_Numeric $array\r\n$array = @(\"a\")             #false\r\nis_Numeric $array",
    "version":  "0.0.0"
},{
    "title":  "Opens a file explorer window to allow user to select a file.",
    "name":  "Select-File",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "A file explorer window opens, when function is instantiated. Function returns complete path to file chosen.",
    "paramName":  "NONE\r\nA parameter can be implemented to determine where file explorer window opens (root dir). Default is set to \"Desktop\".",
    "output":  "[System.String] The string conatins the path to file chosen.",
    "example":  "$filePath = Select-Folder\r\n#Dialog window opens\r\n#User navigates and chooses DIR of interest\r\nWrite-Host $filePath  #Output = \u003e \"C:\\some\\path\\that\\you\\choose\"",
    "version":  "0.0.0"
},{
    "title":  "Opens a file explorer window to allow user to select a directory.",
    "name":  "Select-Folder",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "A file explorer window opens, whne function is instantiated. Function returns path to directory chosen.",
    "paramName":  "NONE A parameter can be implemented to determine where file explorer window opens (root dir). Default is set to \"Desktop\".",
    "output":  "[System.String] The string conatins the path to directory chosen.",
    "example":  "$dirPath = Select-Folder\r\n#Dialog window opens\r\n#User navigates and chooses DIR of interest\r\nWrite-Host $dirPath  #Output = \u003e \"C:\\some\\path\\that\\you\\choose\"",
    "version":  "0.0.0"
},{
    "title":  "Prompts the user with a menu. Menu is persistent, until a valid numerical option has been chosen from menu.",
    "name":  "Select-Option",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "This will output a menu to the console, displaying array elements as numerical options. Pormpt isd persistent. If an invalid option is chosen, prompt will re-run until a proper option has been chosen.",
    "paramName":  "[string[]] $options An array with options to prompt user with.",
    "output":  "[System.Int] The respective index of the numerical key chosen. Not the numerical key itself, but the index of the element corresponding to numerical key chosen.",
    "example":  "$array = @(\"option1\",\"option2\",\"option3\")\r\n$Prompt = \"Choose an Option below\"\r\nSelect-Option $array $prompt\r\nChoose an Option below\r\n--------------------------------\r\n1. option1\r\n2. option2\r\n3. option3\r\n0. QUIT\r\n--------------------------------\r\n-\u003e: 2\r\n1\r\n# If user inputs \"2\", function returns \"1\" (index of chosen element in $array for further computation).",
    "version":  "0.0.0"
},{
    "title":  "Enter full or partial name (or email) of a user to retrieve corresponding user object.",
    "name":  "Select-User",
    "group":  "HelperFunctions",
    "groupTitle":  "HelperFunctions",
    "description":  "Function will match user search string to any name (email) that contains that string. Returns all possible matches in a menu for the user to select the correct one.",
    "paramName":  "",
    "output":  "Returns a user object corresponding",
    "example":  "",
    "version":  "0.0.0"
}] });
