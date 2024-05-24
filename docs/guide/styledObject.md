# styledObject

`useStyled`和`styled`函数均会创建`styledObject`，其声明如下：

```ts
type StyledObject ={
    className: string
    styleId  : string
    vars     : Record<string,string | number> 
    getStyle : (css?:CSSRuleObject,props?:any)=>CSSProperties
    props    : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>{ className:string,style  : CSSProperties}
}
```


`StyledObject`各个属性的含义如下：


## className

返回生成的`className`，用于给元素添加样式类名。
默认情况下，该值是一个随机生成的`HASH`字符串，但是也可以在创建样式对手动指定。

```ts
const myStyle = styled({...},{
    className:'my-class'
})
```
 
## styleId

生成的`styleId`，用于给元素添加样式ID。默认情况下，该值也是随机生成的`HASH`字符串，但是也可以在创建样式对手动指定。

```ts
const myStyle = styled({...},{
    styleId:'my-class'
})
```
 
## vars

返回创建的样式对象的CSS变量清单。

## getStyle

`getStyle`函数用于返回一个`StyledObject`样式对象。其函数签名如下：

```ts
getStyle(css?:CSSRuleObject,props?:any):CSSProperties
```

- 当样式声明中包含`动态样式`或`CSS变量`才需要使用`getStyle`函数，其返回值是一个`CSSProperties`对象，用来传递给组件的根元素`style`属性，如果没有样式中不包括`动态样式`或`CSS变量`，则可以不必传递。

- `getStyle`函数第`1`个参数`css`是`CSSRuleObject`样式对象，用来指定`CSS变量`值或者额外的内联样式参数。

- `getStyle`函数第`2`个参数用来传入当前组件的`props`对象，供动态样式使用。


## props

`props`函数用于生成`className`和`style`属性，用于简化组件传参。

```tsx
import { styled } from 'flexstyled'

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton = styled<StyledButtonProps>((props,{className,getStyle})=>{ 
    return <button className={className} style={getStyle({},props)} />
},{
    // ...css
})
```

以上需要分别解构传入`className`和`getStyle`属性，如果使用`props`函数，可以简化为：

```tsx
const StyledButton = styled<StyledButtonProps>((props,{props:styleProps})=>{ 
    return <button  {...styleProps({},{props})} />
},{...})

//  或者

const myStyle = styled({...})

const StyledButton = (props)=>{ 
    return <button  {...myStyle.props({stype:{样式或CSS变量},props,className:"额外的样式类"})} />
},{...})


```







