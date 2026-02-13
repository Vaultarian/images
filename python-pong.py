"""Turtle-based Pong game tailored for Trinket's Python runtime."""

import random
import turtle

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
PADDLE_SPEED = 24
BALL_SPEED = 4
WINNING_SCORE = 10

wn = turtle.Screen()
wn.title("Trinket Pong")
wn.bgcolor("black")
wn.setup(width=SCREEN_WIDTH, height=SCREEN_HEIGHT)
wn.tracer(0)

left_score = 0
right_score = 0

left_paddle = turtle.Turtle()
left_paddle.speed(0)
left_paddle.shape("square")
left_paddle.color("white")
left_paddle.shapesize(stretch_wid=6, stretch_len=1)
left_paddle.penup()
left_paddle.goto(-350, 0)

right_paddle = turtle.Turtle()
right_paddle.speed(0)
right_paddle.shape("square")
right_paddle.color("white")
right_paddle.shapesize(stretch_wid=6, stretch_len=1)
right_paddle.penup()
right_paddle.goto(350, 0)

ball = turtle.Turtle()
ball.speed(0)
ball.shape("square")
ball.color("white")
ball.penup()
ball.goto(0, 0)
ball.dx = 0
ball.dy = 0

pen = turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, SCREEN_HEIGHT // 2 - 60)
pen.write("0 : 0", align="center", font=("Courier", 32, "bold"))

message = turtle.Turtle()
message.speed(0)
message.color("white")
message.penup()
message.hideturtle()
message.goto(0, 0)


def update_score():
    pen.clear()
    pen.write("{} : {}".format(left_score, right_score), align="center", font=("Courier", 32, "bold"))


def show_message(text):
    message.clear()
    message.write(text, align="center", font=("Courier", 24, "normal"))


def reset_ball():
    ball.goto(0, 0)
    ball.dx = 0
    ball.dy = 0
    show_message("Press Space to serve")


def serve_ball():
    if ball.dx == 0 and ball.dy == 0:
        ball.dx = random.choice([-BALL_SPEED, BALL_SPEED])
        ball.dy = random.choice([-BALL_SPEED, BALL_SPEED])
        message.clear()


def left_paddle_up():
    y = left_paddle.ycor()
    y = min(y + PADDLE_SPEED, SCREEN_HEIGHT // 2 - 60)
    left_paddle.sety(y)


def left_paddle_down():
    y = left_paddle.ycor()
    y = max(y - PADDLE_SPEED, -SCREEN_HEIGHT // 2 + 60)
    left_paddle.sety(y)


def right_paddle_up():
    y = right_paddle.ycor()
    y = min(y + PADDLE_SPEED, SCREEN_HEIGHT // 2 - 60)
    right_paddle.sety(y)


def right_paddle_down():
    y = right_paddle.ycor()
    y = max(y - PADDLE_SPEED, -SCREEN_HEIGHT // 2 + 60)
    right_paddle.sety(y)


def start_new_round():
    global left_score, right_score
    left_score = 0
    right_score = 0
    update_score()
    reset_ball()
    wn.onkeypress(serve_ball, "space")


reset_ball()
update_score()

wn.listen()
wn.onkeypress(left_paddle_up, "w")
wn.onkeypress(left_paddle_down, "s")
wn.onkeypress(right_paddle_up, "Up")
wn.onkeypress(right_paddle_down, "Down")
wn.onkeypress(serve_ball, "space")

while True:
    wn.update()

    if ball.dx == 0 and ball.dy == 0:
        continue

    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)

    if ball.ycor() > SCREEN_HEIGHT // 2 - 10:
        ball.sety(SCREEN_HEIGHT // 2 - 10)
        ball.dy *= -1

    if ball.ycor() < -SCREEN_HEIGHT // 2 + 10:
        ball.sety(-SCREEN_HEIGHT // 2 + 10)
        ball.dy *= -1

    if ball.xcor() > SCREEN_WIDTH // 2 - 50:
        if abs(ball.ycor() - right_paddle.ycor()) < 60:
            ball.setx(SCREEN_WIDTH // 2 - 50)
            ball.dx *= -1
        else:
            left_score += 1
            update_score()
            if left_score >= WINNING_SCORE:
                show_message("Left player wins! Press Space to restart")
                ball.dx = 0
                ball.dy = 0
                wn.onkeypress(start_new_round, "space")
            else:
                reset_ball()

    if ball.xcor() < -SCREEN_WIDTH // 2 + 50:
        if abs(ball.ycor() - left_paddle.ycor()) < 60:
            ball.setx(-SCREEN_WIDTH // 2 + 50)
            ball.dx *= -1
        else:
            right_score += 1
            update_score()
            if right_score >= WINNING_SCORE:
                show_message("Right player wins! Press Space to restart")
                ball.dx = 0
                ball.dy = 0
                wn.onkeypress(start_new_round, "space")
            else:
                reset_ball()

wn.mainloop()
