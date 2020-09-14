#Unit impulse
t = [-1: 0.0001: 1] * 1000;
L = length(t);
delay = input('Enter the delay if any (in msec) = ');
delay_in_sample = delay / 0.1;
impulse = [zeros(1, (L - 1) / 2 + delay_in_sample) 1 zeros(1, (L - 1) / 2 - delay_in_sample)];
plot(t, impulse);
xlabel('Time (msec)');
ylabel('Amplitude');
title('Unit Impulse Function');
