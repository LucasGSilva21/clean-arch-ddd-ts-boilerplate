module "authentication" {
  source         = "../../infra/authentication"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}
