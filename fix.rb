require 'pp'

lines = DATA.read.split("\n")

hash = {}
lines.each do |line|
  s = line.split ' ', 2
  hash[s[0]] = s[1]
end

input = File.read('val2.js')

output = input.gsub(/_0x7ca2\[(\d+)\]/) do |m|
  hash[$1]
end

puts output



__END__
0 'MongoClient'
1 'mongodb'
2 'crypto'
3 'commander'
4 'If you are looking at this then SHAME ON YOU'
5 'argv'
6 'parse'
7 '-p, --port [port]'
8 'MongoDB port to connect to.  Default is \'27017\''
9 'option'
10 '-h, --host [host]'
11 'MongoDB host to connect to.  Default is \'localhost\''
12 'localhost'
13 '-c, --collection [collection]'
14 'Collection containing weather data.  Default is \'messages\''
15 'messages'
16 '-d, --db [database]'
17 'Database containing weather data.  Default is \'enron\''
18 'enron'
19 'mongodb://'
20 'host'
21 ':'
22 'port'
23 '/'
24 'db'
25 'can\'t connect to MongoDB using: mongodb://'
26 '.  Is it running?'
27 'log'
28 'collection'
29 'mrpotatohead@mongodb.com'
30 '<8147308.1075851042335.JavaMail.evans@thyme>'
31 'Failed to query MongoDB.  Is it running?'
32 'Sorry, but I could not find '
33 ' in the headers.To lists'
34 'Sorry, but I found '
35 ' in multiple documents. You should probably re-import the dataset.'
36 'undefined'
37 'I thought there was a doc, and then there was none. Are you modifing the dataset while I am running?'
38 'headers'
39 'Message-ID'
40 'Document structure is not correct.  Cannot find "headers.Message-ID" field.'
41 'You should probably re-import the dataset.'
42 'dir'
43 'Found a document with '
44 ' but the Message-ID is not correct.'
45 'Message-ID is '
46 'findOne'
47 'count'
48 'find'
49 'Welcome to the Final Exam Q3 Checker. My job is to make sure you correctly updated the document'
50 'Failed Validation: The document was not updated correctly'
51 'close'
52 'Final Exam Q3 Validated successfully!'
53 'aes256'
54 'createDecipher'
55 'hex'
56 'utf8'
57 'update'
58 'final'
59 'Your validation code is: '
60 '7591130833c040b942800350627be214973bfc132599d73bafec137e049c5349'
61 '747BeoTScGLdLSV4FdvT'
62 'connect'
