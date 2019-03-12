<!DOCTYPE html>
<html>
    <body>
        <pre>
            <?php
                $File = file('../Access-log.txt'); 
                $Array = array();

                foreach ($File as $Line) {
                    $Object = new \stdClass();
                    // Split the line and get the first element, the IP-address
                    $Parts = explode(' ',trim($Line));
                    $Object->IPaddress = $Parts[0];

                    // Get the timestamp between two brackets
                    $Firstpos = strpos($Line, "[") + 1;
                    $Secondpos= strpos($Line, "]");
                    $Timestamp = substr($Line, $Firstpos, $Secondpos - $Firstpos);

                    // Split the timestamp and get the date 
                    $TimestampParts = explode(':',trim($Timestamp));
                    $Date = $TimestampParts[0];
                    $Date = str_replace('/', '-', $Date);
                    $Object->Date = date('Y-m-d', strtotime($Date));
                    
                    // Split the timestamp and get the time
                    $Firstpos = strpos($Timestamp, ":") + 1;
                    $Secondpos= strpos($Timestamp, " ");
                    $Object->Time = substr($Timestamp, $Firstpos, $Secondpos - $Firstpos);

                    // Split the timestamp and get the time zone 
                    $TimeZone = explode(' ',trim($Timestamp));
                    $Object->TimeZone = $TimeZone[1];                  

                    // Split the line and get the HTTP command and Protocol Version 
                    $Parts = explode('"',trim($Line));
                    $HTTPandProtocolV = $Parts[1];
                    $HTTPandProtocolVParts = explode(" ", $HTTPandProtocolV, 2);
                    $Object->HTTPCommand = $HTTPandProtocolVParts[0];
                    $Object->ProtocolVersion = $HTTPandProtocolVParts[1];

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
                $JSONstring = json_encode($Array);

                // Save the JSON string to a JSON file
                file_put_contents('../test.json', $JSONstring);
            ?>
        </pre>
    </body>
</html>