import React, { useEffect } from 'react'
import { ShareOption } from 'grommet-icons'
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, CardHeader, CardFooter, CardBody } from 'grommet';
import { fetchCountries, showCountries } from '../features/CountrySlice';
import { useNavigate } from 'react-router-dom';

const Countries = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const countries = useSelector(showCountries)

    useEffect(() => {
        dispatch(fetchCountries())
        // eslint-disable-next-line
    }, [])

    return (
        <div >
            {countries?.map((country, ind) =>
                <div key={ind} style={{ display: "inline-block" }}>
                    <Card width="auto" background="light-1" margin='5px'>
                        <CardHeader pad="medium">{country.name}</CardHeader>
                            <CardBody pad="small" style={{ display: 'contents' }} onClick={()=> navigate(`/flightsbycountry/${country.name}`)}>
                                <img style={{ height: '90px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${country.image}`} alt="flag" />
                            </CardBody>
                        <CardFooter pad={{ horizontal: "small" }} background="light-2">
                            <Button icon={<ShareOption color="plain" />} hoverIndicator />
                        </CardFooter>
                    </Card>
                    <br />
                </div>
            )}
        </div>
    )
}

export default Countries