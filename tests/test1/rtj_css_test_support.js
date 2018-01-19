// *****************************************************************************
// *****************************************************************************
// File:						misc_routines.php
// Date:           		18 January 2018
// Description:      	Classes to support css test
// *****************************************************************************
// *****************************************************************************


class rtj_Logger
{

	// ********************************************************************* 
	// Constructor
	// ********************************************************************* 
	constructor() 
	{
		// ********************************************************************* 
		// Text contained in this class
		// ********************************************************************* 
		this.txt = "";
		// ********************************************************************* 
		// Line Termination Character
		// ********************************************************************* 
		this.lineTerm= "\r\n";
		// ********************************************************************* 
		// Space Character
		// ********************************************************************* 
		this.spaceChar= " ";
		// ********************************************************************* 
		// Indent Level
		// ********************************************************************* 
		this.indentLevel = 0;
		// ********************************************************************* 
		// Spaces to indent per Indent Level
		// ********************************************************************* 
		this.indentSpaces = 3;
	}		
		
		
		
	// ********************************************************************* 
	// Set up for HTML display
    // ********************************************************************* 
    html_setup()
    {
		this.lineTerm		= "<br/>";
		this.spaceChar	= "&nbsp;";	  
    }

	// ********************************************************************* 
	// Set up to Write to a Text File
    // ********************************************************************* 
    text_setup()
    {    
		this.lineTerm		= "\r\n";
		this.spaceChar	= " ";		
    }

    // ********************************************************************* 
	// Create indent string
    // ********************************************************************* 
    indentString()
    {
		return (this.spaceChar).repeat(this.indentSize());
    }
	
    // ********************************************************************* 
	// Create indent string
    // ********************************************************************* 
    indentSize()
    {
		return(this.indentSpaces*this.indentLevel);
    }
	
    // ********************************************************************* 
	// increase the indent level
    // ********************************************************************* 
    incLevel()
    {
		this.indentLevel++;
    }
	
    // ********************************************************************* 
	// decrease the indent level
    // ********************************************************************* 
    decLevel()
    {
		if (this.indentLevel>0) this.indentLevel--;
    }
	
	// ********************************************************************* 
	// multiple carriage returns
    // ********************************************************************* 
    cr(number_of_cr=1)
    {
		return (this.lineTerm).repeat(number_of_cr);
    }

	
	// ********************************************************************
	// Append
	// ********************************************************************
	append(str)
	{
		this.txt = this.txt.str;  
	}
	

	
	// ********************************************************************
	// AppendCR
	// ********************************************************************
	appendCR(str="")
	{
		this.txt = this.txt.str.this.lineTerm; 
	}
	
	// ********************************************************************
	// Append Indent
	// ********************************************************************
	appendIndent(str="")
	{
		this.txt =  this.txt.this.indentString().str;  
	}
	
	// ********************************************************************
	// Append Indent CR
	// ********************************************************************
	appendIndentCR(str="",cr_after=1,cr_before=0)
	{
		this.txt +=  this.cr(cr_before)+this.indentString()+str+this.cr(cr_after);
	}	
	
	
	// ********************************************************************
	// Append Indent CR THE CALLING FUNCTION
	// ********************************************************************
	appendIndentCR_THIS_FUNCTION(str="",cr_after=1,cr_before=0)
	{
		//vDebug = debug_backtrace();
		//callingFunction = vDebug[1]['function']."()";
		this.txt +=  this.cr(cr_before)+this.indentString()+"Enter Function:"+callingFunction.str+this.cr(cr_after);
	}	
	

	// ********************************************************************
	// Banner
	// ********************************************************************
	banner(banner_text)
	{

		var banner =  this.lineTerm+"*".repeat(80)+this.lineTerm+"* "+banner_text+this.lineTerm+"*".repeat(80)+this.lineTerm;
		this.txt+=banner;	
	}	
	

	// ********************************************************************
	// Indented Banner
	// ********************************************************************
	indentedBanner(banner_text)
	{
		iVal 	= this.indentSize();
		frame 	= "// "+"*".repeat(80-iVal-3);

		this.appendIndentCR(frame );
		this.appendIndentCR("// "+banner_text);
		this.appendIndentCR(frame );
	}	
	

	
	// ********************************************************************
	// Append all text to file
	// ********************************************************************
	appendToFile(filename)
	{
		//fh = fopen(filename, 'a') or die("can't open file");
		//fwrite(fh, this.txt);
		//fclose(fh);
	}
		
		

	// Getter
	get area() {
		return this.calcArea();
	}
	// Method
	calcArea() {
		return this.height * this.width;
	}
}


// ************************************************************************* 
// CSS Class Generator
// *************************************************************************
class rtj_CSS
{    
	// ********************************************************************* 
	// Constructor
	// ********************************************************************* 
	constructor(selector="") 
	{    
		this.selector 			= selector;
		this.declarations 	= new Object();
	}
	
	// ********************************************************************* 
	// Add declaration
	// ********************************************************************* 
	addDeclaration(property,value)
	{    
		this.declarations[property] = value;
	}
	
	
	// ********************************************************************* 
	// Add declarations
	// ********************************************************************* 
	addDeclarations(declarations)
	{    
		Object.entries(declarations).forEach(([property, value]) => {
			this.addDeclaration(property,value);
		});
	}
	
	
	// ********************************************************************* 
	// Get the text of the CSS Class
	// ********************************************************************* 
	get()
	{
		var rule = this.selector+" {"+"\r\n"   ;
		
		Object.entries(this.declarations).forEach(([property, value]) => {
			rule = rule+"   "+property+": "+value+";\r\n" ;
		});
		
		rule = rule+"}"+"\r\n" ;
		
		return rule;
	}
	
}    


// *****************************************************************************
// Test 1
// *****************************************************************************
function test1()
{
	var logger = new rtj_Logger(10, 10);
	logger.incLevel();
	logger.appendIndentCR("moo");
	logger.decLevel();
	logger.appendIndentCR("moo");
	logger.appendIndentCR("moo");
	logger.appendIndentCR("moo");
	logger.banner("Happy Days");
	console.log(logger.txt);
}

// *****************************************************************************
// Test 2
// *****************************************************************************
function test2()
{
	const obj = { a: 5, b: 7, c: 9 };
	Object.entries(obj).forEach(([key, value]) => {
	console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
	});
}

// *****************************************************************************
// Test 3
// *****************************************************************************
function test3()
{
	var css = new rtj_CSS("Sammo");
	css.addDeclaration("color","red");
	css.addDeclarations( {"font":"helvetica","padding":"10px"});
	console.log(css.get());
}
test3();
