const ip = 'https://elm.cangdu.org';
const Index = () => {
    const [cities, setCities] = React.useState({}); //城市列表
    const [ininial, setIninial] = React.useState([]); //首字母
    const [clickItem, setClickItem] = React.useState(null);//点击的首字母
    const clickItemRef = React.useRef()
    React.useEffect(() => {
        // fetch(`${ip}/v1/cities?type=group`)  //网络链接
        fetch('json/cities.json')   //本地链接
            .then((res) => res.json())
            .then((res) => {
                setCities(res);
                setIninial(Object.keys(res).sort());
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const showBig = (e, item) => {
        clickItemRef.current.style.display = 'block';
        clickItemRef.current.style.top = e.target.offsetTop + 'px';
        setClickItem(item)
    }
    const showSmall = () => {
        clickItemRef.current.style.display = 'none';
        setClickItem(null);
    }
    return (
        <div className='index'>
            <div className='clickItem' ref={clickItemRef}>{clickItem}</div>
            <div className='allCity'>
                {ininial.map((item, index) => (
                    <div key={`city${item}`} className='ininial'>
                        <div id={`${item}_${index}`}></div>
                        <h2>{item}</h2>
                        <ul>
                            {cities[item].map((value, index) => (
                                <li key={value.id}>{value.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <ul className='fastTo'>
                {ininial.map((item, index) => (
                    <li key={`fastTo${item}`} className='fastToIninial'>
                        <a
                            href={`#${item}_${index}`}
                            onTouchStart={(e) => showBig(e, item)}
                            onTouchEnd={() => { showSmall() }}>{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
ReactDOM.render(<Index />, document.getElementById('root'));