export function MainContainer(props) {
  return <>
    <div id={props.id || 'main-container'}>
      <div className={`box ${props.className || ''}`}>
        <div className='box-background'>
          <div className='box-header' />
          <div className='box-body' />
        </div>
        {props.children}
      </div>
    </div>
  </>
}