import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import BaseClass from "../context/baseclass";

class Index extends BaseClass {

    componentDidMount(){
        localStorage.clear();
        this.CallMount();
    }

    render(){
        return (
            <Container maxWidth="md">
                <Box my={4}>


                    <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                    <h1 className="StartLink">
                        <Link href="/start" color="secondary">
                            Click To Start
                        </Link>
                    </h1>

                    <pre>
                        ~~~ REQUIREMENTS ~~~<br /><br />
                        <br /><br />
                        You own a bakery. You make several types of bread every day in both pan and round loaves. You’ve decided to create yourself a single page web application to assist you in optimizing your oven space utilization.<br /><br />
You love Next.js and Material UI so you’ve decided to start from the Material + Next.js example project: https://github.com/mui-org/material-ui/tree/master/examples/nextjs<br /><br />
You want to optimize your batch of bread as follows: <br /><br />
● There is a batch of each type of bread, and you make it in either pan or round loaf.<br /><br />
● Every customer will get at least one product matching their exact specifications.<br /><br />
● You make as few round loaves as possible as they are less efficient in utilizing your oven’s square footage.<br /><br />
The interface will allow you to define the types of bread you are making each day, and then enter a list of customer orders with their loaf style preferences. It will then find the optimal arrangement to best satisfy your customers and your budget.<br /><br />
An example batch may be:<br /><br />
You are cooking Sourdough, Whole grain, and Banana bread today and have three customers.<br /><br />
<br /><br />
Customer 1 wants a Sourdough round loaf. <br /><br />
Customer 2 wants a Whole grain pan loaf and Banana round loaf.<br /><br />
Customer 3 wants a Sourdough pan loaf and Whole grain round loaf.<br /><br />
I will have to make all three breads in round loaves. <br /><br />
<br /><br />
Some customer orders may be impossible to fill due to your peculiar restrictions: You are cooking only Sourdough today and have two customers.<br /><br />
<br /><br />
Customer 1 wants a Sourdough round loaf. <br /><br />
Customer 2 wants a Sourdough pan loaf.<br /><br />
No solution exists. You will have to call your customers and get one to compromise.<br /><br />

                    </pre>

                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

export default Index;
