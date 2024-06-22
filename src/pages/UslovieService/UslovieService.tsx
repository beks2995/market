import { Link } from 'react-router-dom'
import './UslovieService.css'

const UslovieService = () => {
    return (
        <>
            <main>
                <div className='container'>
                    <div className='UslovieServiceCards'>
                        <div className='uslovieServiceCard'>
                            <h2 className='uslovieServiceTitle'>Условия сервиса</h2>
                            <p className='uslovieServiceDescription'>Задача организации, в особенности же курс на социально-ориентированный национальный проект требует от нас системного анализа модели развития! Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует от нас анализа системы масштабного изменения ряда параметров! С другой стороны социально-экономическое развитие напрямую зависит от всесторонне сбалансированных нововведений?</p>
                        </div>
                        <div className='uslovieServiceCard'>
                            <h2 className='uslovieServiceTitle'>Условия доставки</h2>
                            <p className='uslovieServiceDescription'>Задача организации, в особенности же курс на социально-ориентированный национальный проект требует от нас системного анализа модели развития! Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует от нас анализа системы масштабного изменения ряда параметров! С другой стороны социально-экономическое развитие напрямую зависит от всесторонне сбалансированных нововведений?</p>
                        </div>
                        <div className='uslovieServiceCard'>
                            <h2 className='uslovieServiceTitle'>Условия возврата</h2>
                            <p className='uslovieServiceDescription'>Задача организации, в особенности же курс на социально-ориентированный национальный проект требует от нас системного анализа модели развития! Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует от нас анализа системы масштабного изменения ряда параметров! С другой стороны социально-экономическое развитие напрямую зависит от всесторонне сбалансированных нововведений?</p>
                        </div>
                    </div>
                    <div className='UslovieSericeButtonContainer'>
                    <Link to='/'><button className='UslovieServiceButtonToMain'>На главную</button></Link>
                    </div>
                </div>
              
            </main>
            
        </>
    )
}

export default UslovieService