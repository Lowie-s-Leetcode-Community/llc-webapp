import React from 'react';

import { Card, CardContent, useTheme } from '@mui/material';

function About() {
  const theme = useTheme();

  return (
    <>

      <h3>About us</h3>
      <Card style={{
        borderRadius: 16,
        backgroundColor: theme.palette.background.card,
        boxShadow: theme.shadows.card,
      }}
      >
        <CardContent>

          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed euismod, sapien vel bibendum bibendum, elit elit bibendum elit,
              vel bibendum elit elit elit. Sed euismod, sapien vel bibendum bibendum,
              elit elit bibendum elit, vel bibendum elit elit elit.

            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed euismod, sapien vel bibendum bibendum, elit elit bibendum elit,
              vel bibendum elit elit elit. Sed euismod, sapien vel bibendum bibendum,
              elit elit bibendum elit, vel bibendum elit elit elit.

            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed euismod, sapien vel bibendum bibendum, elit elit bibendum elit,
              vel bibendum elit elit elit. Sed euismod, sapien vel bibendum bibendum,
              elit elit bibendum elit, vel bibendum elit elit elit.

            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default About;
