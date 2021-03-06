import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { makeStyles } from '@material-ui/core/styles';
import PostRecognition from '../components/PostRecognition';
import Balance from '../components/Balance';
import Feed from '../components/Feed';
import TopReceivers from '../components/TopReceivers';
import TopBadges from '../components/TopBadges';

const useStyles = makeStyles((theme) => ({
    fixed_right_panel: {
        position: 'sticky',
        top: 16,
        right: 0,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 16px)'
    },
}));

function Home () {
    const classes = useStyles();
    const [balanceTabToShow, setBalanceTabToShow] = useState(0);
    const badgeSetStatus = true;

    const onHandleTabChange = (tabIndex) => {
        setBalanceTabToShow(tabIndex);
    }
    
    return (
        <Container>
            <Row className='position-relative justify-content-start align-items-start'>
                <Col xs={6} md={6} lg={8}>
                    <PostRecognition
                        switchBalanceTab={onHandleTabChange}
                    />
                    <Feed />
                </Col>
                <Col xs={6} md={6} lg={4} className={classes.fixed_right_panel}>
                    <div>
                        <Balance 
                            slideIndex={balanceTabToShow}
                            onHandleChange={onHandleTabChange}
                        />
                        <TopReceivers />
                        {badgeSetStatus && <TopBadges />}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home