# Use it to create the service account
eksctl create iamserviceaccount \                                               [fd3bf3dbe]
  --cluster=budibase-eks-production \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::545012296077:policy/AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve

# Apply k8s definitions
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.3.1/cert-manager.yaml
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"

# deploy the controller
helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller \
  --set clusterName=budibase-eks-production \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  -n kube-system

kubectl wait --for=condition=available --timeout=600s deployment/aws-load-balancer-controller -n kube-system
kubectl get deployment -n kube-system aws-load-balancer-controller