bwJs
=============
######这是一个轻量级,高性能的组建库,使JS更加简单

多学一点bwJs，就能少写一点代码。

-------------

######选择器：返回类型 [ Array ]

    $( 'element' );  // 这个选择器用法与 beJs 语法完全一样。

####事件  参数类型为 Function

#####页面载入 ready(fn); || $(fn);

当DOM载入完成时执行一个函数，简单地说，这个方法是window.load事件的替代方法。通过使用这个方法，可以在 DOM 加载完成时立即调用你所绑定的函数。

    ready(function(){  // 页面载入时触发
        // Code
    });

    $(function(){  // 这是上面的简化版
        // Code
    });


#####click( fn );

触发每一个匹配元素的 click 事件，事件启动后，执行 'fn' 回调函数

click 事件会在鼠标点击左键的时候触发。

    $( 'p' ).click(function(){  //点击所有 p 元素对象时触发
        //Code
    });


#####contextmenu( fn );

触发每一个匹配元素的 contextmenu 事件，事件启动后，执行 'fn' 回调函数

contextmenu 事件会在鼠标点击右键的时候触发。

    $( document ).contextmenu(function(){
        //Code
    });


#####mouseover( fn );

mouseover事件会在鼠标移入对象时触发，触发时执行 'fn' 回调函数

    $( '#div' ).mouseover(function(){  //鼠标移入ID为 div 的元素对象时触发
        //Code
    });


#####mouseout( fn );

mouseout事件会在鼠标移出对象时触发，触发时执行 'fn' 回调函数

    $( '#div' ).mouseout(function(){  //鼠标移出ID为 div 的元素对象时触发
        //Code
    });


#####mouseenter( fn );

mouseenter事件会在鼠标移入对象时触发，触发时执行 'fn' 回调函数

    $( '#div' ).mouseenter(function(){  //鼠标移入ID为 div 的元素对象时触发
        //Code
    });


#####mouseleave( fn );

mouseleave事件会在鼠标移出对象时触发，触发时执行 'fn' 回调函数

    $( '#div' ).mouseleave(function(){  //鼠标移出ID为 div 的元素对象时触发
        //Code
    });


#####focus() || focus( fn );

当focus事件不加参数的时候会设置该对象的状态为 focus

当focus加一个参数 那么会在该对象的状态变成 focus 时，执行这个参数（参数类型为Function）

    $(function(){
        $( '#text' ).focus();  //当DOM载入完成后，将ID为text的元素对象获取焦点
    });

    $( '#text' ).focus(function(){
        alert( 'focus' );  //当ID为text的元素获取焦点时，执行 alert( 'focus' ) 弹出 'focus';
    });


#####blur( fn );

在每一个匹配元素的blur事件中绑定一个处理函数。

    $( 'input' ).blur( function(){ alert( 'blur' ); } );  //所有input元素失去焦点的时候，执行函数弹出 'blur'


#####change( fn );

在每一个匹配元素的change事件中绑定一个处理函数。

change事件会在元素失去焦点的时候触发，也会当其值在获得焦点后改变时触发。

    $( 'select' ).change(function(){  //当select触发change事件时执行函数
        //Code
    } );


#####keydown( fn );

在每一个匹配元素的keydown事件中绑定一个处理函数。

keydown事件会在键盘按下时触发。

    $( document ).keydown(function(){
        //Code
    });


#####keyup( fn );

在每一个匹配元素的keyup事件中绑定一个处理函数。

keyup 事件会在键盘抬起时触发。

    $( document ).keyup(function(){
        //Code
    });


#####hover( over, out );

一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。

over：鼠标移到元素上要触发的函数

out：鼠标移出元素要触发的函数

    $( 'a' ).hover(function(){
        //Code
    },function(){
        //Code
    });

####CSS


#####css( name );  name类型为 String

当css方法的参数为一个，并且参数类型为 String 时，该方法会返回第一个匹配元素的样式属性。简单的说就是'获取属性'

    $( 'p' ).css( 'color' );  //返回页面中第一个p元素的Color属性


#####css( name, val );  name类型为 String ，val类型为 String

在所有匹配的元素中，设置样式属性为 name 设置样式属性值为 val

    $( 'p' ).css( 'color', 'red' );  //设置所有 p 元素的color为red


#####css( properties );  name类型为 Object[ 一个 属性-值 配对的对象 ]

把一个“名/值对”对象设置为所有匹配元素的样式属性。

    $( 'div' ).css( {  //等价于CSS中的 div{width:200px;height:200px;background:red;}
        width : '200px',
        height : '200px',
        background : 'red' 
    } );

