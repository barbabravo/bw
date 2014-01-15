/*
*创建时间：2014-01-13
*创建人：berwin
*用途：JS组件库，轻量级，高性能
*/
'use strict';

function bw( arg ){
    this.elements = [];
    if( typeof arg === 'function' ){
        ready( arg );
    }else if( arg.constructor === String ){
        this.elements = be( arg );
    }else if( typeof arg === 'object' ){
        if( arg.length ){
            for( var i = 0; i < arg.length; i++ ){
                this.elements[ i ] = arg[ i ];
            }
        }else{
            this.elements.push( arg );
        }
    }
}

'click|mouseover|mouseout|focus|blur|change|keydown|keyup|contextmenu'.replace( /\w+/g, function( s ){
    bw.prototype[ s ] = function( fn ){
        for( var i = 0; i < this.elements.length; i++ ){
            addEvent( this.elements[ i ], s, fn );
        }
    };
} );

bw.prototype.css = function( name, val ){
    if( arguments.length === 2 ){
        if( val.constructor === String ){
            for( var i = 0; i < this.elements.length; i++ ){
                this.elements[ i ].style[ name ] = val;
            }
        }
    }else if( arguments.length === 1 ){
        if( name.constructor === String ){
            for( var i = 0; i < this.elements.length; i++ ){
                return getStyle( this.elements[ i ], name );
            }
        }else if( typeof name === 'object' ){
            for( var i in name ){
                for( var j = 0; j < this.elements.length; j++ ){
                    this.elements[ j ].style[ i ] = name[i];
                }
            }
        }
    }
};

bw.prototype.mouseenter = function( fn ){
    for( var i = 0; i < this.elements.length; i++ ){
        addEvent( this.elements[ i ], 'mouseover', function( ev ){
            var from = ev.fromElement || ev.relatedTarget;
            if ( isChild( this, from ) ) return;
            fn && fn.call( this, ev );
        } );
    }
};
bw.prototype.mouseleave = function( fn ){
    for( var i = 0; i < this.elements.length; i++ ){
        addEvent( this.elements[ i ], 'mouseout', function( ev ){
            var to = ev.toElement || ev.relatedTarget;
            if( isChild( this, to ) ) return;
            fn && fn.call( this, ev );

        } );
    }
};
bw.prototype.hover = function( fnOver, fnOut ){
    this.mouseenter( fnOver );
    this.mouseleave( fnOut );
};
function isChild( oParent, obj ){
    while( obj ){
        if( obj === oParent ) return true;
        obj = obj.parentNode;
    }
    return false;
}
function getStyle( obj, style ){
    if( obj.currentStyle ){
        return obj.currentStyle[ style ];
    }else{
        return getComputedStyle( obj, false )[ style ];
    }
}

function addEvent( obj, sEv, fn ){
    if( obj.addEventListener ){
        obj.addEventListener( sEv, fn, false );
    }else{
        obj.attachEvent( 'on'+sEv, function(){
            fn.call( obj, event );
        } );
    }
}

function $( arg ){
    return new bw( arg );
}
function ready( fn ){
    if( document.addEventListener ){
        document.addEventListener( 'DOMContentLoaded', function(){
            fn && fn();
        }, false );
    }else{
        var temp = false;
        document.attachEvent( 'onreadystatechange', function(){
            if( document.readyState === 'complete' ){
                if( temp ) return;
                fn && fn();
                temp = true;
            }
        } );

        if( !window.frameElement ){
            var timer = setInterval(function(){
                try{
                    document.documentElement.doScroll( 'left' );
                    clearInterval( timer );
                    if( temp ) return;
                    fn && fn();
                    temp = true;
                }catch(e){}
            },1);
        }

    }
}

function getClass( oParent, oClass ){
    var arr = [];
    var aTag = oParent.getElementsByTagName( '*' );
    for( var i = 0; i < aTag.length; i++ ){
        var aClass = aTag[ i ].className.split( ' ' );
        if( findArr( aClass, oClass ) ){
            arr.push( aTag[ i ] );
        }
    }
    return arr;
}
function findArr( arr, n ){
    for( var i = 0; i < arr.length; i++ ){
        if( arr[ i ] === n ) return true;
    }
    return false;
}
function getEle( aParent, str ){
    var arr = [];
    for( var i = 0; i < aParent.length; i++ ){
        switch( str.charAt( 0 ) ){
            case '#':
                var obj = document.getElementById( str.substring( 1 ) );
                arr.push( obj );
            break;

            case '.':
                if( /^(\.[\w\-]+\.[\w\-]+)$/.test( str ) ){
                    var aStr = str.match( /[\w\-]+/g );
                    var aC = [];
                    aC = getClass( aParent[ i ], aStr[ 0 ] );
                    for( var j = 0; j < aC.length; j++ ){
                        if( findArr( aC[ j ].className.split( ' ' ), aStr[1] ) ){
                            arr.push( aC[ j ] );
                        }
                    }
                }else if( /^\.[\w\-]+#[\w\-]+$/.test( str ) ){
                    var aStr = str.match( /[\w\-]+/g );
                    var aC = getClass( aParent[i], aStr[0] );
                    for( var j = 0; j < aC.length; j++ ){
                        if( aC[ j ].id === aStr[1] ){
                            arr.push( aC[ j ] );
                        }
                    }
                }else{
                    var aTag = getClass( aParent[ i ], str.substring(1) );
                    for( var j = 0; j < aTag.length; j++ ){
                        arr.push( aTag[ j ] );
                    }
                }
            break;

            default:

            if( /\w+\.[\w\-]+$/.test( str ) ){
                var aStr = str.split( '.' );
                var aTag = aParent[ i ].getElementsByTagName( aStr[ 0 ] );
                var re = new RegExp( '([^\\w\\-]|^)'+ aStr[ 1 ] +'([^\\w\\-]|$)' );
                for( var j = 0; j < aTag.length; j++ ){
                    if( re.test( aTag[ j ].className ) ){
                        arr.push( aTag[ j ] );
                    }
                }
            }else if( /^\w+#[\w\-]+$/.test( str ) ){
                var aStr = str.split( '#' );
                var aTag = aParent[ i ].getElementsByTagName( aStr[0] );
                for( var j = 0; j < aTag.length; j++ ){
                    if( aTag[ j ].id === aStr[ 1 ] ){
                        arr.push( aTag[ j ] );
                    }
                }
            }else if( /^\w+\[\w+=.+\]$/.test( str ) ){
                var aStr = str.split( '[' );
                aStr[ 1 ] = aStr[ 1 ].substring( 0, aStr[ 1 ].length - 1 );
                var aTag = aParent[ i ].getElementsByTagName( aStr[0] );
                var aStr2 = aStr[1].split( '=' );
                for( var j = 0; j < aTag.length; j++ ){
                    if( aTag[ j ].getAttribute( aStr2[0] ) === aStr2[1] ){
                        arr.push( aTag[ j ] );
                    }
                }
            }else if( /^\w+:\w+(\-\w+|\(.+\))?$/.test( str ) ){
                var aStr = str.split( ':' );
                var aTag = aParent[i].getElementsByTagName( aStr[0] );
                var aStr2 = aStr[1].split( '(' );
                if( aStr2[1] ){
                    aStr2[1] = aStr2[1].substring( 0, aStr2[1].length - 1 );
                }

                switch( aStr2[0] ){
                    case 'first':
                        arr.push( aTag[0] );
                    break;

                    case 'last':
                        arr.push( aTag[ aTag.length - 1 ] );
                    break;

                    case 'eq':
                        arr.push( aTag[ aStr2[1] ] );
                    break;

                    case 'even':
                        for( var j = 0; j < aTag.length; j++ ){
                            if( j % 2 === 0 ){
                                arr.push( aTag[ j ] );
                            }
                        }
                    break;

                    case 'odd':
                        for( var j = 0; j < aTag.length; j++ ){
                            if( j % 2 !== 0 ){
                                arr.push( aTag[ j ] );
                            }
                        }
                    break;

                    case 'header':
                        var aH = [];
                        for( var j = 0; j < aTag.length; j++ ){
                            for( var l = 1; l < 7; l++ ){
                                aH.push( aTag[ j ].getElementsByTagName( 'h'+l ) );
                            }
                            for( var k = 0; k < aH.length; k++ ){
                                if( aH[ k ].length ){
                                    for( var m = 0; m < aH[k].length; m++ ){
                                        arr.push( aH[k][m] );
                                    }
                                }
                            }
                        }
                    break;
                }
            }


            var aTag = aParent[ i ].getElementsByTagName( str );
            for( var j = 0; j < aTag.length; j++ ){
                arr.push( aTag[ j ] );
            }
            break;
        }
    }
    return arr;
}

function be( str ){
    var arr = str.replace( /^\s+|\s+$/g, '' ).split( /\s+/ );
    var aChild = [];
    var aParent = [ document ];
    for( var i = 0; i < arr.length; i++ ){
        aChild = getEle( aParent, arr[ i ] );
        aParent = aChild;
    }
    return aChild;
}