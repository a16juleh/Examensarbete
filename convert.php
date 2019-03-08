<!DOCTYPE html>
<html>
    <body>
        <pre>
            <?php
                $File = file('log.txt');
                $Array = array();

                foreach ($File as $Line) {
                    $Object = new \stdClass();
                    // Split the line and get the first element, the IP address
                    $Parts = explode(' ',trim($Line));
                    $Object->IPaddress = $Parts[0];

                    // Get the value between two brackets, without saving the brackets
                    $Firstpos=strpos($Line, "[") + 1;
                    $Secondpos=strpos($Line, "]");
                    $Object->Timestamp = substr($Line, $Firstpos, $Secondpos - $Firstpos);

                    // Split the line and get the HTTP command and Protocol Version 
                    $Parts = explode('"',trim($Line));
                    $Object->HTTPandProtocolV = $Parts[1];

                    // Split the part after HTTP command and Protocol Version to get
                    // both Status Code and Bytes Transferred
                    $Part = explode(' ',trim($Parts[2]));
                    $Object->StatusCode = $Part[0];
                    $Object->BytesTransferred = $Part[1];

                    // Use the same array with values from the splitting with quotes marks
                    // to get the URI and Browser
                    $Object->ReferrerURI = $Parts[3];
                    $Object->Browser = $Parts[5];
                    
                    array_push($Array, $Object);
                }
                   
                // Encode the array with all the objects into a JSON string
                $JSONstring = json_encode($Array, JSON_PRETTY_PRINT);
                
                // Print out the JSON string
                echo $JSONstring;

                // Save the JSON string to a JSON file
                file_put_contents('Access-log.json', $JSONstring);
            ?>
        </pre>
    </body>
</html>